/* eslint-disable @typescript-eslint/no-var-requires */
import { Pool } from "pg";
import CypherService from "../cypherService";

class ConnectionPool {
  pool = null;
  config;
  cypherService;
  constructor(config = null) {
    this.pool = new Pool(config);
    this.config = config;
    this.cypherService = new CypherService("age");
    this.pool.on("error", (err, client) => {
      console.error("Unexpected error on idle client", err);
      client.on("error", (err) => {
        console.error("Unexpected error on idle client", err);
      });
    });
  }

  sqls = {
    metaNode: ``,
    metaEdge: ``,
    metaProperty: ``,
  };

  async testConnection() {
    let success = {
      success: true,
    };
    try {
      const client = await this.pool.connect();
      await client.query("select 1");
      await client.release();
    } catch (error) {
      return {
        success: false,
        error: true,
        message: error.message,
        stack: error.stack,
      };
    }
    return success;
  }

  async getConnection(scheme?: string) {
    if (this.pool === null) return null;
    const client = await this.pool.connect();
    if (scheme) await client.query(`
      LOAD 'age';
      SET search_path = ag_catalog, "$user", public;
    `);
    return client;
  }

  async release(client) {
    if (client) await client.release();
  }

  async getMetadata(graph) {
    const client = await this.getConnection(graph);
    let nodes = null;
    let edges = null;
    let properties = null;
    try {
      nodes = await client.query(this.sqls.metaNode);
      edges = await client.query(this.sqls.metaEdge);
      properties = await client.query(this.sqls.metaProperty);
      this.release(client);
    } catch (error) {
      console.log(error);
      this.release(client);
      return error;
    }
    const nodeMeta = {};
    const edgeMeta = {};
    const propertyMeta = {};

    nodes.rows.forEach((row) => {
      nodeMeta[row.label] = row.cnt;
    });
    edges.rows.forEach((row) => {
      edgeMeta[row.label] = row.cnt;
    });
    properties.rows.forEach((row) => {
      propertyMeta[row.key] = row.key_type;
    });

    return {
      nodeMeta,
      edgeMeta,
      propertyMeta,
    };
  }

  async excuteQuery(query, graph) {
    const client = await this.getConnection(graph);
    let result = null;
    try {
      result = await client.query(query);
      this.release(client);
    } catch (error) {
      console.log(error);
      this.release(client);
      return error;
    }
    return this.cypherService.createResult(result);
  }

  async excuteQueryWithParams(query, params) {
    const client = await this.getConnection();
    let res = null;
    try {
      res = await client.query(query, params);
      this.release(client);
    } catch (error) {
      console.log(error);
      this.release(client);
      return error;
    }
    return res;
  }

  async excuteCypherWithParams(query, params, graph) {
    const client = await this.getConnection(graph);
    let res = null;
    try {
      res = await client.query(query, params);
      this.release(client);
    } catch (error) {
      console.log(error);
      this.release(client);
      return error;
    }
    return res;
  }

  async close() {
    await this.pool.end();
  }
}

module.exports = ConnectionPool;

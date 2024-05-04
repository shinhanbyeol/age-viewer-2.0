import { Pool } from 'pg';
import { getQuery } from './ageFlavorManager';
import { AGE_FLAVOR } from './types';

const AGE_LATEST_VERSION = process.env.AGE_LATEST_VERSION;

class ConnectionPool {
  config;
  pool: Pool | null = null;
  type: AGE_FLAVOR;
  version: string;
  sqls;
  constructor(config = null, type: AGE_FLAVOR = null, version = null) {
    this.pool = new Pool(config);
    this.config = config;

    if (type == null)
      console.warn('Connection Type is not defined. set AGE as default.');
    this.type = type || AGE_FLAVOR.AGE;

    if (this.version == null)
      console.warn('AGE Version is not defined. set 1.5.0 as default.');
    this.type = version || AGE_LATEST_VERSION;

    this.sqls = {
      metaNode: getQuery('nodes', this.type, this.version),
      metaEdge: getQuery('edges', this.type, this.version),
      metaProperty: getQuery('properties', this.type, this.version),
    };

    // error handling
    this.pool.on('error', (err, client) => {
      console.error('Unexpected error on idle client', err);
      client.on('error', (err) => {
        console.error('Unexpected error on idle client', err);
      });
    });
  }

  /**
   * @description Test Connection
   * @returns {
   * success: boolean,
   * error: boolean,
   * message: string,
   * stack: string | null
   * }
   */
  async testConnection() {
    let success = {
      success: true,
      error: false,
      message: 'Connection Success',
      stack: null,
    };
    try {
      const client = await this.pool.connect();
      await client.query('select 1');
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

  /**
   * @description Get Connection
   * @param {string} scheme
   * @returns {PoolClient} client
   */
  async getConnection(scheme?: string) {
    if (this.pool === null) return null;
    const client = await this.pool.connect();
    if (scheme && this.type === AGE_FLAVOR.AGE) {
      await client.query(
        `LOAD 'age'; SET search_path = ag_catalog, "$user", public;`,
      );
    }
    if (scheme && this.type === AGE_FLAVOR.BLUE) {
      // TODO: For AGE BLUE
    }

    return client;
  }

  /**
   * @description Release Connection
   * @param {PoolClient} client
   * @returns {void}
   */
  async release(client) {
    if (client) await client.release();
  }

  /**
   * @description Get Metadata
   * @param {string} graph
   * @returns {
   * nodeMeta: { [label: string]: number },
   * edgeMeta: { [label: string]: number },
   * propertyMeta: { [key: string]: string }
   * }
   */
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

  /**
   * @description Execute Query
   * @param {string} query
   * @param {string} graph
   */
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
    return result;
  }

  /**
   * @description Execute Query with Params
   * @param {string} query
   * @param {Array<any>} params
   */
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

  /**
   * @description Execute Cypher Query
   * @param {string} query
   * @param {string[]} params
   * @param {string} graph
   */
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

export default ConnectionPool;

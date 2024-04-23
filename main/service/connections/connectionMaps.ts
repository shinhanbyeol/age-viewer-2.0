/* eslint-disable @typescript-eslint/no-var-requires */
const agensgraphConnection = require('./agensGraphRepository');
const uuid = require('uuid');
export default class ConnectionMaps {
  connections;
  constructor() {
    this.connections = new Map();
  }

  async addConnection(config, serverType) {
    let connection = null;
    switch (serverType) {
      case 'potgres':
        break;

      default:
        break;
    }
    const sessionId = uuid.v4(config.id);
    // connection test
    const test = await connection.testConnection();
    if (test.success) {
      this.connections.set(sessionId, connection);
      return sessionId;
    } else {
      return test;
    }
  }

  removeConnectionByServerId(serverId) {
    let sessionId = null;
    try {
      this.connections.forEach((connection, key) => {
        if (connection.config.id === serverId) {
          serverId = key;
          connection.close();
        }
      });
      this.connections.delete(serverId);
      return sessionId;
    } catch (error) {
      throw Error('Connection Close Error');
    }
  }

  removeConnectionBySessionId(sessionId) {
    const connection = this.connections.get(sessionId);
    connection && connection.close();
    this.connections.delete(sessionId);
    return sessionId;
  }

  getConnection(sessionId) {
    return this.connections.get(sessionId);
  }

  getConnections(payload) {
    if (payload) {
      const { sessionId } = payload;
      const connection = this.connections.get(sessionId);
      return connection;
    } else {
      return this.connections;
    }
  }
}

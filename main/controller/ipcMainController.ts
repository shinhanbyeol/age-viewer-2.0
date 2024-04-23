import { ipcMain } from 'electron';
import ConnectionsMap from '../service/connections/connectionMaps';
import ServerService from '../service/serverService';
import fs from 'fs';
import path from 'path';


class IpcMainController {
  metaDb;
  connectionsMap;
  app;
  cachePath;
  constructor(metaDb, app, cachePath) {
    this.init();
    this.metaDb = metaDb;
    this.connectionsMap = new ConnectionsMap();
    this.app = app;
    this.cachePath = cachePath;
  }

  init() {
    /**
     * @returns {Promise}
     */
    ipcMain.handle('getServers', async (event) => {
      const serverService = new ServerService(this.metaDb);
      const servers = await serverService.getServers();
      return servers;
    });
    /**
     * @param {String} payload.serverId
     * @returns {Promise}
     */
    ipcMain.handle('getServer', async (event, payload) => {
      console.log('getServer', payload);
      const serverService = new ServerService(this.metaDb);
      const server = await serverService.getServer(payload);
      return server;
    });
    ipcMain.handle('addServer', async (event, payload) => {
      console.log('addServer', payload);
      const serverService = new ServerService(this.metaDb);
      const serverId = await serverService.addServer(payload);
      return serverId;
    });
    ipcMain.handle('updateServer', async (event, payload) => {
      const serverService = new ServerService(this.metaDb);
      const serverId = await serverService.updateServer(payload);
      return serverId;
    });
    ipcMain.handle('removeServer', async (event, payload) => {
      console.log('removeServer', payload);
      const serverService = new ServerService(this.metaDb);
      const serverId = await serverService.removeServer(payload);
      return serverId;
    });
    /**
     * @param {String} payload.serverId
     */
    ipcMain.handle('getMetadata', async (event, payload) => {
      const connection = await this.connectionsMap.getConnection(
        payload.connectionId,
      );
      const metadata = await connection.getMetadata(payload.graphPath);
      return metadata;
    });
    /**
     * @returns {Promise}
     */
    ipcMain.handle('getConnections', async (event, payload) => {
      return this.connectionsMap.getConnections(payload);
    });
    /**
     * @param {String} payload.serverId
     * @returns {Promise}
     */
    ipcMain.handle('createConnnection', async (event, payload) => {
      const serverService = new ServerService(this.metaDb);
      const server = await serverService.getServer(payload.serverId);
      const config = {
        host: server.host,
        port: server.port,
        user: server.user,
        password: server.password,
        database: server.database,
      };
      const serverType = server.server_type;
      const connection = await this.connectionsMap.addConnection(
        config,
        serverType,
      );
      return connection;
    });
    /**
     * @param {String} payload.connectionId
     * @returns {Promise} {connectionId, isConnected}
     */
    ipcMain.handle('checkConnection', async (event, payload) => {
      const connection = await this.connectionsMap.getConnection(
        payload.connectionId,
      );
      const test = (await connection?.testConnection()) ?? {
        success: false,
        error: true,
      };
      // remove connection if connection is not connected
      if (test.error) {
        await this.connectionsMap.removeConnectionBySessionId(
          payload.connectionId,
        );
      }
      return {
        connectionId: payload.connectionId,
        isConnected: Boolean(test.success),
      };
    });
    /**
     * @param {String} payload.connectionId
     * @returns {Promise}
     */
    ipcMain.handle('disconnectServer', async (event, payload) => {
      const connection = await this.connectionsMap.removeConnectionBySessionId(
        payload.connectionId,
      );
      return connection;
    });
    /**
     * @param {String} payload.connectionId
     * @param {String} payload.query
     * @param {string} payload.graph graph is non required
     * @returns {Promise}
     */
    ipcMain.handle('excuteQuery', async (event, payload) => {
      const connection = await this.connectionsMap.getConnection(
        payload.connectionId,
      );
      const result = await connection.excuteQuery(payload.query, payload.graph);
      return result;
    });
    /**
     * @param payload.fileName
     * @param payload.fileType
     * @param payload.fileExt
     * @param payload.fileData
     * @description 파일 type 에 따라 각기 다른경로에 파일을 저장한다.
     */
    ipcMain.handle('writeFile', async (event, payload) => {
      const { fileName, fileType, fileExt } = payload;
      const appPath = this.app.getAppPath();
      const fileFullPath = path.join(
        this.cachePath,
        `${fileType}`,
        `${fileName}.${fileExt}`,
      );
      try {
        await fs.writeFileSync(fileFullPath, payload.fileData);
      } catch (err) {
        return new Error(err);
      }
    });
    /**
     * @param payload.fileName
     * @param payload.fileType
     * @param payload.fileExt
     * @description 파일 type 에 따라 각기 다른경로에 파일을 불러들인다.
     * @returns {Promise<File>}
     */
    ipcMain.handle('readFile', async (event, payload) => {
      const { fileName, fileType, fileExt } = payload;
      const appPath = this.app.getAppPath();
      const fileFullPath = path.join(
        this.cachePath,
        `${fileType}`,
        `${fileName}.${fileExt}`,
      );
      try {
        const code = await fs.readFileSync(fileFullPath, 'utf8');
        return code;
      } catch (error) {
        console.log(error);
        return null;
      }
    });
  }
}

module.exports = IpcMainController;

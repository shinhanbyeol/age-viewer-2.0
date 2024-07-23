import { ipcMain } from 'electron';
import ConnectionsMap from '../connections/connectionMaps';
import ServerService from '../service/serverService';
import CypherService from '../service/cypherService';
import fs from 'fs';
import path from 'path';
import { AGE_FLAVOR } from '../connections/types';

class IpcMainController {
  appData;
  connectionsMap: ConnectionsMap;
  app;
  cachePath;
  constructor(appData, app, cachePath) {
    this.init();
    this.appData = appData;
    this.connectionsMap = new ConnectionsMap();
    this.app = app;
    this.cachePath = cachePath;
  }

  init() {
    /**
     * @description Get Servers
     * @returns servers
     */
    ipcMain.handle('getServers', async (event) => {
      const serverService = new ServerService(this.appData);
      const servers = await serverService.getServers();
      return servers;
    });

    /**
     * @description Get Server
     * @param {String} payload
     * @returns server
     */
    ipcMain.handle('getServer', async (event, payload) => {
      console.log('getServer', payload);
      const serverService = new ServerService(this.appData);
      const server = await serverService.getServer(payload);
      return server;
    });

    /**
     * @description Add Server
     * @param {
     * name: string,
     * host: string,
     * port: number,
     * database: string,
     * user: string,
     * password: string,
     * serverType?: AGE_FLAVOR
     * } payload
     * @returns {string} serverId
     */
    ipcMain.handle('addServer', async (event, payload) => {
      console.log('addServer', payload);
      const serverService = new ServerService(this.appData);
      const serverId = await serverService.addServer(payload);
      return serverId;
    });

    /**
     * @description Update Server
     * @param {
     * name: string,
     * host: string,
     * port: number,
     * database: string,
     * user: string,
     * password: string,
     * serverType?: AGE_FLAVOR
     * } payload
     */
    ipcMain.handle('updateServer', async (event, payload) => {
      const serverService = new ServerService(this.appData);
      const serverId = await serverService.updateServer(payload);
      return serverId;
    });

    /**
     * @description Remove Server
     * @param {String} payload.serverId
     * @returns {string} serverId
     */
    ipcMain.handle('removeServer', async (event, payload) => {
      console.log('removeServer', payload);
      const serverService = new ServerService(this.appData);
      const serverId = await serverService.removeServer(payload);
      return serverId;
    });

    /**
     * @description Get Metadata
     * @param {
     * connectionId: string,
     * graphPath: string
     * } payload
     */
    ipcMain.handle('getMetadata', async (event, payload) => {
      const connection = await this.connectionsMap.getConnection(
        payload.connectionId,
      );
      const metadata = await connection.getMetadata(payload.graphPath);
      return metadata;
    });

    /**
     * @description Get Connections
     *              kor: 커넥션 리스트 가져오기
     * @returns {Promise}
     */
    ipcMain.handle('getConnections', async (event, payload) => {
      return this.connectionsMap.getConnections(payload);
    });

    /**
     * @description Create Connection
     *              kor: 데이터베이스 커넥션 생성
     * @param {
     * id: string,
     * severType: 'AGE' | 'AGENSGRAPH',
     * host: string,
     * port: number,
     * user: string,
     * password: string,
     * database: string
     * } payload
     * @returns {
     * sessionId: string | null,
     * success: boolean,
     * error: boolean,
     * message: string,
     * stack: string | null
     * } testResult
     */
    ipcMain.handle('createConnnection', async (event, payload) => {
      const serverService = new ServerService(this.appData);
      const server = await serverService.getServer(payload.id);
      const config = {
        host: server.host,
        port: server.port,
        user: server.user,
        password: server.password,
        database: server.database,
      };

      const version = server.version;
      const session = await this.connectionsMap.addConnection(
        config,
        server.serverType === 'AGE' ? AGE_FLAVOR.AGE : AGE_FLAVOR.AGENSGRAPH,
        version,
      );
      return session;
    });

    /**
     * @description Check Connection
     *              kor: 커넥션 연결상태 확인
     * @param {String} sessionId
     * @returns {Promise} {sessionId, isConnected}
     */
    ipcMain.handle('checkConnection', async (event, payload) => {
      const connection = await this.connectionsMap.getConnection(
        payload,
      );
      const test = (await connection?.testConnection()) ?? {
        success: false,
        error: true,
      };
      // remove connection if connection is not connected
      if (test.error) {
        await this.connectionsMap.removeConnectionBySessionId(
          payload,
        );
      }
      return {
        sessionId: payload,
        isConnected: Boolean(test.success),
      };
    });

    /**
     * @description Disconnect Server
     *              kor: 연결 해제
     * @param {String} sessionId
     * @returns {Promise}
     */
    ipcMain.handle('disconnectServer', async (event, payload) => {
      const connection = await this.connectionsMap.removeConnectionBySessionId(
        payload,
      );
      return connection;
    });

    /**
     * @description get graph path list (schema list)
     *              kor: 그래프 경로 리스트 가져오기 (스키마 리스트)
     * @param {String} sessionId
     */
    ipcMain.handle('getGraphs', async (event, payload) => {
      const connection = await this.connectionsMap.getConnection(payload);
      const graphPathList = await connection.getGraphPaths();
      return graphPathList;
    });

    /**
     * @description Excute Query
     *              kor: 쿼리 실행
     * @param {String} payload.sessionId
     * @param {String} payload.query
     * @param {string} payload.graph graph is non required
     * @returns {Promise}
     */
    ipcMain.handle('excuteQuery', async (event, payload) => {
      const connection = await this.connectionsMap.getConnection(
        payload.sessionId,
      );
      const cypherService = new CypherService(connection);
      const result = await connection.excuteQuery(payload.query, payload.graph);
      return cypherService.createResult(result);
    });

    /**
     * @description Excute Query with Params
     *              Save the file to different paths depending on the file type.
     *              kor: 파라미터를 포함한 쿼리 실행
     *              kor: 파일 type 에 따라 각기 다른경로에 파일을 저장한다.
     * @param payload.fileName
     * @param payload.fileType
     * @param payload.fileExt
     * @param payload.fileData
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
     * @description Read File at cache folder
     *              Load the file into different paths depending on the file type.
     *              kor: 캐시 폴더에서 파일 읽기
     *              kor: 파일 type 에 따라 각기 다른경로에 파일을 불러들인다.
     * @param payload.fileName
     * @param payload.fileType
     * @param payload.fileExt
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

export default IpcMainController;

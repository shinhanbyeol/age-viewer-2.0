import { get } from 'node:http';

export const DEBUGGERLIST = [
  'getServers',
  'getServer',
  'addServer',
  'updateServer',
  'removeServer',
  'getDatabases',
  'getConnections',
  'createConnnection',
  'checkConnection',
  'disconnectServer',
  'excuteQuery',
  'writeFile',
  'readFile',
];

export enum DEBUGGER {
  GET_SERVERS = 'getServers',
  GET_SERVER = 'getServer',
  ADD_SERVER = 'addServer',
  UPDATE_SERVER = 'updateServer',
  REMOVE_SERVER = 'removeServer',
  GET_DATABASES = 'getDatabases',
  GET_CONNECTIONS = 'getConnections',
  CREATE_CONNECTION = 'createConnnection',
  CHECK_CONNECTION = 'checkConnection',
  DISCONNECT_SERVER = 'disconnectServer',
  EXCUTE_QUERY = 'excuteQuery',
  WRITE_FILE = 'writeFile',
  READ_FILE = 'readFile',
}

export const DEBUGGER_SAMPLE_PARAMS = {
  getServers: null,
  getServer: {
    serverId: '-1',
  },
  addServer: {
    name: 'testsserver',
    host: '127.0.0.1',
    port: '5432',
    database: 'postgres',
    user: 'age',
    password: 'age',
  },
  updateServer: {
    id: '-1',
    name: 'update-test',
    host: '127.0.0.1',
    port: '5432',
    database: 'postgres',
    user: 'update_age',
    password: 'update_age',
  },
  removeServer: {
    serverId: '-1',
  },
  getMetadata: {
    connectionId: '-1',
  },
  getConnections: null,
  createConnnection: {
    host: '127.0.0.1',
    port: '5432',
    database: 'postgres',
    user: 'age',
    password: 'age',
  },
  checkConnection: {
    connectionId: '-1',
  },
  disconnectServer: {
    connectionId: '-1',
  },
  excuteQuery: {
    connectionId: '-1',
    query: 'select 1234, 5432',
    graph: 'age'
  },
  writeFile: {
    fileName: 'writefile-debugger',
    fileType: 'cache',
    fileExt: 'txt',
    fileData: 'test by debugger page',    
  },
  readFile: {
    fileName: 'writefile-debugger',
    fileType: 'cache',
    fileExt: 'txt',
  }
};

export const DEBUGGER_DESCRIPTION = {
  getServer: 'Get Server',
  addServer: 'Add Server',
  updateServer: 'Update Server',
  removeServer: 'Remove Server',
  getDatabases: 'Get Databases',
  getConnections: 'Get Connections',
  createConnnection: 'Create Connection',
  checkConnection: 'Check Connection',
  disconnectServer: 'Disconnect Server',
  excuteQuery: 'Excute Query',
  writeFile: 'Write File',
  readFile: 'Read File',
};

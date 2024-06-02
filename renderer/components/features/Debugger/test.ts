
export const TESTLIST = [
  {
    type: 'handle',
    name: 'getServers',
    description: 'Get Servers',
    parmsExample: ``,
  },
  {
    type: 'handle',
    name: 'getServer',
    description: 'Get Server',
    parmsExample: ``,
  },
  {
    type: 'handle',
    name: 'addServer',
    description: 'Add Server',
    parmsExample: `{
      name: string,
      host: string,
      port: number,
      database: string,
      user: string,
      password: string,
      serverType?: AGE_FLAVOR
    }`,
  },
  {
    type: 'handle',
    name: 'updateServer',
    description: 'Update Server',
    parmsExample: `{
      name: string,
      host: string,
      port: number,
      database: string,
      user: string,
      password: string,
      serverType?: AGE_FLAVOR
    }`,
  },
  {
    type: 'handle',
    name: 'removeServer',
    description: 'Remove Server',
    parmsExample: `{
      serverId: string
    }`,
  },
  {
    type: 'handle',
    name: 'getDatabases',
    description: 'Get Databases',
    parmsExample: `{
      serverId: string
    }`,
  },
  {
    type: 'handle',
    name: 'getConnections',
    description: 'Get Connections',
    parmsExample: `{
      serverId: string
    }`,
  },
  {
    type: 'handle',
    name: 'createConnnection',
    description: 'Create Connection',
    parmsExample: `{
      serverId: string
    }`,
  },
  {
    type: 'handle',
    name: 'checkConnection',
    description: 'Check Connection',
    parmsExample: `{
      serverId: string
    }`,
  },
  {
    type: 'handle',
    name: 'disconnectServer',
    description: 'Disconnect Server',
    parmsExample: `{
      serverId: string
    }`,
  },
  {
    type: 'handle',
    name: 'excuteQuery',
    description: 'Excute Query',
    parmsExample: `{
      serverId: string,
      query: string
    }`,
  },
  {
    type: 'handle',
    name: 'writeFile',
    description: 'Write File',
    parmsExample: `{
      serverId: string,
      path: string,
      content: string
    }`,
  },
  {
    type: 'handle',
    name: 'readFile',
    description: 'Read File',
    parmsExample: `{
      fileName: string,
      fileType: string,
      fileExt: string,
    }`,
  },
]
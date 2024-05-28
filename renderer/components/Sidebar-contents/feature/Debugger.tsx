import { List, ListItem } from '@chakra-ui/react';

const IpcDebugger = () => {
  const DEBUGGERLIST = [
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

  return (
    <>
      <List>
        {DEBUGGERLIST.map((item) => (
          <ListItem onClick={() => {}}>{item}</ListItem>
        ))}
      </List>
    </>
  );
};

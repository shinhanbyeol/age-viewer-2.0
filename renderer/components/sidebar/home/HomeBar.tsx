import React, { memo, useCallback, useEffect, useState } from 'react';
import { ServerResponse } from '../../../types';

// styles
import Styels from './HomeBar.module.scss';
import { Heading, Text } from '@chakra-ui/react';
import ServerList from '../../features/ServerList';

const HomeBar = () => {
  const [servers, setServers] = useState<ServerResponse[]>([]);

  const refreshServers = useCallback(() => {
    window.ipc.invoke('getServers', null).then((res: ServerResponse[]) => {
      setServers(res);
    });
  }, []);

  // on mount
  useEffect(() => {
    refreshServers();
    window.addEventListener('agv2:event:server:created', refreshServers);
    // on unmount
    return () => {
      window.removeEventListener('agv2:event:server:created', refreshServers);
    };
  }, [refreshServers]);

  return (
    <div className={Styels.Root}>
      <Heading fontSize="medium" fontWeight="bold">
        Graph Database instances
      </Heading>
      <ServerList servers={servers} />
    </div>
  );
};

export default memo(HomeBar);

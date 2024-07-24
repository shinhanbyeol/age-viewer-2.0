import React, { memo, useCallback, useEffect, useState } from 'react';
import { ServerResponse } from '../../../types';

// styles
import Styels from './HomeBar.module.scss';
import {
  Button,
  Heading,
  Modal,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import AddServer from '../../features/AddServer';
import ServerList from '../../features/ServerList';

const HomeBar = () => {
  const [servers, setServers] = useState<ServerResponse[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const refreshServers = useCallback(() => {
    window.ipc.invoke('getServers', null).then((res: ServerResponse[]) => {
      setServers(res);
    });
  }, []);

  const handleModalOpen = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault;
    onOpen();
  };

  // on mount
  useEffect(() => {
    refreshServers();
    window.addEventListener('agv:event:serverlist:refresh', refreshServers);
    // on unmount
    return () => {
      window.removeEventListener(
        'agv:event:serverlist:refresh',
        refreshServers,
      );
    };
  }, [refreshServers]);

  return (
    <div className={Styels.Root}>
      <Heading
        fontSize="medium"
        fontWeight="bold"
        display={'flex'}
        alignItems={'center'}
        pl={'1rem'}
        mt={'1rem'}
      >
        Graph Database instances
        <Button
          h={'1.5rem'}
          margin={'1rem'}
          backgroundColor={'#c9b3f5'}
          onClick={handleModalOpen}
        >
          + new server
        </Button>
      </Heading>
      <Modal isOpen={isOpen} onClose={() => onClose()}>
        <ModalOverlay />
        {isOpen && <AddServer onClose={onClose} />}
      </Modal>
      <ServerList servers={servers} />
    </div>
  );
};

export default memo(HomeBar);

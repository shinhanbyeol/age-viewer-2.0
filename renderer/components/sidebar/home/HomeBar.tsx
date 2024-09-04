import React, { memo, useCallback, useEffect, useState } from 'react';
import { IPCResponse, ServerResponse } from '../../../types';

// styles
import Styels from './HomeBar.module.scss';
import {
  Button,
  Heading,
  IconButton,
  Modal,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import AddServer from '../../features/AddServer';
import ServerList from '../../features/ServerList';
import { FcAddDatabase } from 'react-icons/fc';

interface HomeBarProps {
  visible: boolean;
}

const HomeBar = ({ visible }: HomeBarProps) => {
  const [servers, setServers] = useState<ServerResponse[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const refreshServers = useCallback(() => {
    window.ipc
      .invoke('getServers', null)
      .then((res: IPCResponse<ServerResponse[]>) => {
        if (res?.success) {
          setServers(res.data);
        } else {
          alert(res.message);
        }
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
    <div
      className={Styels.Root}
      style={{
        display: visible ? '' : 'none',
      }}
    >
      <Heading
        fontSize="medium"
        fontWeight="bold"
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        pl={'1rem'}
        pr={'1rem'}
        mt={'1rem'}
      >
        <Text>Datbase Explorer</Text>
        {/* <Button h={'1.5rem'} margin={'1rem'} leftIcon={<PiPlusSquareFill />} /> */}
        <IconButton
          aria-label="Add database"
          title="Add database"
          onClick={handleModalOpen}
        >
          <FcAddDatabase size={32} />
        </IconButton>
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

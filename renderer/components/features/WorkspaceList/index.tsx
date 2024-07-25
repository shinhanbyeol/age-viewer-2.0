import { Box, Button, Container, Stack } from '@chakra-ui/react';
import { memo, useEffect, useState } from 'react';
import { ServerResponse, WorkspaceResponse } from '../../../types';

// Styles
import Styles from './Workspace.module.scss';
import FormModal from '../../design/FormModal';
import { useRouter } from 'next/router';

interface WorkspaceProps {
  server: ServerResponse;
  graph: string;
  sessionId: string;
}

const Workspace = ({ server, graph, sessionId }: WorkspaceProps) => {
  const [workspaces, setWorkspaces] = useState<string[]>([]);
  const [clickedWorkspace, setClickedWorkspace] = useState<number | null>();
  const [showNewWorkspaceModal, setShowNewWorkspaceModal] =
    useState<() => void>();
  const router = useRouter();

  const handleWorkspaceDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (clickedWorkspace !== null) {
      router.push({
        pathname: '/workspace',
        query: {
          serverId: server.id,
          serverName: server.name,
          graph: graph,
          sessionId: sessionId,
          workspaceName: workspaces[clickedWorkspace],
        },
      });
    }
  };

  const handleRefreshWorkspaces = () => {
    window.ipc
      .invoke('getWorkspaces', {
        serverId: server.id,
        graph: graph,
      })
      .then((res: WorkspaceResponse[]) => {
        setWorkspaces(res.map((ws) => ws.name));
      });
  };

  const handleNewWorkspace = (values) => {
    window.ipc
      .invoke('createWorkspace', {
        serverId: server.id,
        graph: graph,
        name: values.workspaceName,
      })
      .then((res) => {
        console.log('createWorkspace', res);
        handleRefreshWorkspaces();
      });
  };

  const openNewWorkspaceForm = () => {
    showNewWorkspaceModal();
  };

  useEffect(() => {
    handleRefreshWorkspaces();
  }, []);

  return (
    <Stack direction={'column'}>
      <FormModal
        initialValues={{ workspaceName: '' }}
        cancelText="Cancel"
        confirmText="Create workspace"
        onCloseEvent={() => {}}
        onSubmit={handleNewWorkspace}
        title="Create new workspace"
        wakeupFormModal={(wakeupFunction) => {
          setShowNewWorkspaceModal(() => wakeupFunction);
        }}
      />
      <Container>
        <Button
          h={'1.5rem'}
          width={'100%'}
          justifyContent={'flex-start'}
          onClick={openNewWorkspaceForm}
        >
          + New workspace
        </Button>
      </Container>
      <Container p={0} pl={12}>
        {workspaces.map((workspace, index) => {
          return (
            <Box key={`ws-${index}`} w={'100%'}>
              <a
                className={`${Styles.WorkspaceItem} ${
                  clickedWorkspace === index ? Styles.Active : ''
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setClickedWorkspace(index);
                }}
                onDoubleClick={handleWorkspaceDoubleClick}
              >
                {clickedWorkspace === index}
                {workspace}
              </a>
            </Box>
          );
        })}
      </Container>
    </Stack>
  );
};

export default memo(Workspace);

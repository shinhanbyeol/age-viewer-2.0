import React, { useEffect } from 'react';
import { Main } from '../layout/Main/Main';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Stack,
  Text,
  useEditable,
} from '@chakra-ui/react';
import CodeEditor from '../components/features/CodeEditor';
import Result from '../components/features/Result';
import useGraphology from '../hooks/useGraphology';
import { useGraphologyStore } from '../stores';
import { useWorkspaceStore } from '../stores/workspaceStore';

function WorkspacePage() {
  const router = useRouter();
  const { setWorkspace, setWorkspaceJsonPath, setWorkspaceSqlPath } =
    useWorkspaceStore();
  const {
    serverId,
    serverName,
    graph,
    sessionId,
    workspaceName,
    workspaceSqlPath,
    workspaceJsonPath,
  } = router.query;

  // Check if the query is not null else return an error message
  if (
    !serverId ||
    !graph ||
    !sessionId ||
    !workspaceName ||
    !workspaceSqlPath ||
    !workspaceJsonPath
  ) {
    return (
      <React.Fragment>
        <Head>
          <title>AGE-Viewer-2.0</title>
        </Head>
        <Main>
          <Text fontSize={'4xl'}>Sorry!! something went wrong</Text>
        </Main>
      </React.Fragment>
    );
  }

  // graphology hook
  const { init } = useGraphology();
  const { setLastInitTime } = useGraphologyStore();

  // initialize the graphology
  useEffect(() => {
    init(workspaceName as string, graph as string, Number(serverId));
    setWorkspace(workspaceName as string);
    setWorkspaceJsonPath(workspaceJsonPath as string);
    setWorkspaceSqlPath(workspaceSqlPath as string);
    setLastInitTime(Date.now());
  }, [
    serverId,
    serverName,
    graph,
    sessionId,
    workspaceName,
    workspaceSqlPath,
    workspaceJsonPath,
  ]);

  return (
    <React.Fragment>
      <Head>
        <title>AGE-Viewer-2.0</title>
      </Head>
      <Main>
        <Stack h={'100%'} direction={'column'}>
          <Breadcrumb
            backgroundColor={'black'}
            color={'white'}
            paddingLeft={'1rem'}
          >
            <BreadcrumbItem>
              <Text fontSize={'small'}>{serverName}</Text>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Text fontSize={'small'}>{graph}</Text>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Text fontSize={'small'}>{workspaceName}</Text>
            </BreadcrumbItem>
          </Breadcrumb>
          <Box position={'relative'} display={'block'} flex={1}>
            <Result
              workspaceName={workspaceName as string}
              workspaceJsonPath={workspaceJsonPath as string}
              sessionId={sessionId as string}
              serverId={serverId as string}
              graph={graph as string}
            />
            <CodeEditor
              workspaceSqlPath={workspaceSqlPath as string}
              sessionId={sessionId as string}
              graph={graph as string}
            />
          </Box>
        </Stack>
      </Main>
    </React.Fragment>
  );
}

export default WorkspacePage;

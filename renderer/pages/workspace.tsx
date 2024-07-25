import React from 'react';
import { Main } from '../layout/Main/Main';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Box, Breadcrumb, BreadcrumbItem, Stack, Text } from '@chakra-ui/react';
import CodeEditor from '../components/features/CodeEditor';
import Result from '../components/features/Result';

function WorkspacePage() {
  const router = useRouter();
  const {
    serverId,
    serverName,
    graph,
    sessionId,
    workspaceName,
    workspaceSqlPath,
    workspaceJsonPath,
  } = router.query;

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

  return (
    <React.Fragment>
      <Head>
        <title>AGE-Viewer-2.0</title>
      </Head>
      <Main>
        <Stack h={'100%'} direction={'column'}>
          <Breadcrumb backgroundColor={'#63b3ed50'} color={'#00'}>
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
            <Result />
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

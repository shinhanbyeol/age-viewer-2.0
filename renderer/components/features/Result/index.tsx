import { Box } from '@chakra-ui/react';
import React, { use, useEffect, useState } from 'react';
import useGraphology from '../../../hooks/useGraphology';
import { useGraphologyStore } from '../../../stores';
import { MultiDirectedGraph } from 'graphology';

const Result = ({
  workspaceName,
  workspaceJsonPath,
  graph,
  serverId,
  sessionId,
}: {
  workspaceName: string;
  workspaceJsonPath: string;
  graph: string;
  serverId: string;
  sessionId: string;
}) => {
  const graphology = useGraphologyStore((state) => state.graphology);

  return (
    <Box
      w="100%"
      h="100%"
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
    >
      {graphology.nodes().length > 0 || graphology.edges().length > 0 ? (
        <>
          <div>
            <b>node:</b> <br />
            {JSON.stringify(
              graphology
                .nodes()
                .map((node) => graphology.getNodeAttributes(node)),
              null,
              2,
            )}{' '}
          </div>
          <br />
          <div>
            <b>edge:</b> <br />
            {JSON.stringify(
              graphology.edges().map((e) => graphology.getEdgeAttributes(e)),
              null,
              2,
            )}
          </div>
        </>
      ) : (
        <>
          <Box fontSize={'4xl'} color={'#c4c4c4'} margin={'0 auto'} h={'12rem'}>
            Open editor to Press "Tab" key <br />
            Start writing your cypher query <br />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Result;

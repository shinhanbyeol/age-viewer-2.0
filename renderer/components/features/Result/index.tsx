import { Box } from '@chakra-ui/react';
import React, { useMemo, useRef } from 'react';
import sigma from 'sigma';
import { useGraphologyStore } from '../../../stores';

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
  const sigmaContainerRef = useRef<HTMLDivElement>(null);

  const renderer = useMemo(() => {
    if (!sigmaContainerRef.current) return;
    return new sigma(graphology, sigmaContainerRef.current);
  }, []);

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
          {/* <div className="deubging page">
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
          </div> */}
          <div
            ref={sigmaContainerRef}
            style={{
              backgroundColor: '#f5f5f5',
              width: '500px',
              height: '500px',
              border: '1px solid #000',
            }}
          />
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

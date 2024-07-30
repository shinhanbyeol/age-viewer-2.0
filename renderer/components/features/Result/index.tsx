import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useGraphologyStore } from '../../../stores';
import { SigmaContainer } from '@react-sigma/core';
import Styles from './Result.module.scss';
import MouseEvent from './addons/MouseEvent';
import ExecutedEvent from './addons/ExecutedEvent';
import Layout from './addons/Layout';
import Control from './addons/Control';
import { size } from 'lodash';

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
  const lastExecutedTime = useGraphologyStore(
    (state) => state.lastExecutedTime,
  );

  useEffect(() => {}, [lastExecutedTime]);

  return (
    <Box
      w="100%"
      h="100%"
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      position={'relative'}
    >
      {graphology?.nodes().length > 0 || graphology?.edges().length > 0 ? (
        <SigmaContainer
          graph={graphology}
          className={Styles.SigmaContainer}
          settings={{
            labelSize: 16,
            renderEdgeLabels: true,
            enableEdgeEvents: true,
            itemSizesReference:
              graphology.nodes().length < 6 ? 'screen' : 'positions',
            allowInvalidContainer: true,
            zoomToSizeRatioFunction(ratio) {
              return ratio;
            },
            nodeReducer: (node, attr) => {
              const nodeStyledata = {
                size: 20,
              };
              return { ...attr, ...nodeStyledata };
            },
          }}
        >
          <Control />
          <Layout lastExecutedTime={lastExecutedTime} />
          <MouseEvent />
          <ExecutedEvent lastExecutedTime={lastExecutedTime} />
        </SigmaContainer>
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

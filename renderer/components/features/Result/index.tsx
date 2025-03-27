import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useGraphologyStore } from '../../../stores';
import { SigmaContainer } from '@react-sigma/core';
import Styles from './Result.module.scss';
import MouseEvent from './addons/MouseEvent';
import ExecutedEvent from './addons/ExecutedEvent';
import Layout from './addons/Layout';
import Control from './addons/Control';
import { useWorkspaceStore } from '../../../stores/workspaceStore';
import { entries, size } from 'lodash';
import { color } from 'framer-motion';
import Information from './addons/Information';

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
  const [selectedObjects, setSelectedObjects] = useState<string[]>([]);
  const { designer } = useWorkspaceStore();

  const lastExecutedTime = useGraphologyStore(
    (state) => state.lastExecutedTime,
  );

  useEffect(() => {
    setSelectedObjects([]);
  }, [lastExecutedTime]);

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
            itemSizesReference: 'screen',
            allowInvalidContainer: true,
            zoomToSizeRatioFunction(ratio) {
              return ratio;
            },
            nodeReducer: (node, attr) => {
              const text = designer[attr.label as string]?.text || undefined;
              const convertedLabel = attr.properties[text]
                ? attr?.properties[text]
                : attr.label;
              const nodeStyledata = {
                size: designer[attr.label as string]?.size * 16 || 1 * 16,
                color: designer[attr.label as string]?.color || '#000',
                label: convertedLabel,
              };
              return { ...attr, label: convertedLabel, ...nodeStyledata };
            },
            edgeReducer: (edge, attr) => {
              const text = designer[attr.label as string]?.text || undefined;
              const convertedLabel = attr.properties[text]
                ? attr?.properties[text]
                : attr.label;
              const edgeStyledata = {
                size: designer[attr.label as string]?.size * 4 || 1 * 4,
                color: designer[attr.label as string]?.color || '#000',
                label: convertedLabel,
              };
              return { ...attr, label: convertedLabel, ...edgeStyledata };
            },
          }}
        >
          <Information
            selectedObjects={selectedObjects}
            close={() => {
              setSelectedObjects([]);
            }}
          />
          <Control />
          <Layout lastExecutedTime={lastExecutedTime} />
          <MouseEvent setSelectedObjects={setSelectedObjects} />
          <ExecutedEvent lastExecutedTime={lastExecutedTime} />
        </SigmaContainer>
      ) : (
        <>
          <Box
            fontSize={'4xl'}
            color={'gray'}
            margin={'0 auto'}
            h={'12rem'}
            backgroundColor={'background'}
          >
            Open editor to Press "Tab" key <br />
            Start writing your cypher query <br />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Result;

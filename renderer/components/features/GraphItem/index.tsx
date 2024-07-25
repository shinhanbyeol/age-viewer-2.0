import React, { memo } from 'react';
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Button,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { PiGraph } from 'react-icons/pi';
import WorkspaceList from '../WorkspaceList';
import { ServerResponse } from '../../../types';

interface GraphProps {
  graphPathName: string;
  server: ServerResponse;
  sessionId: string;
}

const Graph = ({ graphPathName, server, sessionId }: GraphProps) => {
  return (
    <AccordionItem>
      {({ isExpanded }) => (
        <>
          <AccordionButton
            as={Button}
            width={'100%'}
            h={'1.5em'}
            pl={8}
            leftIcon={<PiGraph />}
            rightIcon={<ChevronDownIcon />}
            justifyContent={'space-between'}
            textOverflow={'ellipsis'}
          >
            {graphPathName}
          </AccordionButton>
          {isExpanded && (
            <AccordionPanel p={0}>
              <WorkspaceList
                server={server}
                graph={graphPathName}
                sessionId={sessionId}
              />
            </AccordionPanel>
          )}
        </>
      )}
    </AccordionItem>
  );
};

export default memo(Graph);

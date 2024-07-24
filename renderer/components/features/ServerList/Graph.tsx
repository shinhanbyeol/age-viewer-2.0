import React from 'react';
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Button,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { PiGraph } from 'react-icons/pi';

const Graph = ({ graphPathName }: { graphPathName: string }) => {
  return (
    <AccordionItem>
      {({ isExpanded }) => (
        <>
          <AccordionButton
            as={Button}
            width={'100%'}
            h={'1.5em'}
            leftIcon={<PiGraph />}
            rightIcon={<ChevronDownIcon />}
            justifyContent={'space-between'}
            textOverflow={'ellipsis'}
          >
            {graphPathName}
          </AccordionButton>
          {isExpanded && (
            <AccordionPanel pt={0} pl={8}>
              <div>
                <p>test.sql</p>
                <p>graph.sql</p>
                <p>my-agens.slq</p>
                <p>fds.sql</p>
              </div>
            </AccordionPanel>
          )}
        </>
      )}
    </AccordionItem>
  );
};

export default Graph;

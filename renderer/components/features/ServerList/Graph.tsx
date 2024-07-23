import React from 'react';
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

const Graph = ({ graphPathName }: { graphPathName: string }) => {
  return (
    <AccordionItem>
      {({ isExpanded }) => (
        <>
          <AccordionButton width={'100%'} textAlign={'left'} h={'1.5em'}>
            {graphPathName}
          </AccordionButton>
          {isExpanded && (
            <AccordionPanel pb={4} pl={8}>
              <div>
                <button onClick={() => alert('todo works')}>+ new Sql</button>
                <br />
                <button onClick={() => alert('todo works')}>node</button>
                <br />
                <button onClick={() => alert('todo works')}>edge</button>
                <br />
                <button onClick={() => alert('todo works')}>property</button>
              </div>
            </AccordionPanel>
          )}
        </>
      )}
    </AccordionItem>
  );
};

export default Graph;

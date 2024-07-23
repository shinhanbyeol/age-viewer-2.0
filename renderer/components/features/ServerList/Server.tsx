import { memo } from 'react';
import { ServerResponse } from '../../../types';
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@chakra-ui/react';
import ServerPanel from './ServerPanel';

interface ServerProps {
  server: ServerResponse;
}

const Server = ({ server }: ServerProps) => {
  return (
    <>
      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <h3>
              <AccordionButton h={'1.5em'}>{server.name}</AccordionButton>
            </h3>
            {isExpanded && (
              <AccordionPanel pb={4} pl={8}>
                <ServerPanel server={server} />
              </AccordionPanel>
            )}
          </>
        )}
      </AccordionItem>
    </>
  );
};

export default memo(Server);

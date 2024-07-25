import { Box } from '@chakra-ui/react';
import React from 'react';

const Result = () => {
  return (
    <Box w="100%" h="100%" display={'flex'} alignItems={'center'}>
      <Box fontSize={'4xl'} color={'#c4c4c4'} margin={'0 auto'} h={'12rem'}>
        Open editor to Press "Tab" key <br />
        Start writing your cypher query
      </Box>
    </Box>
  );
};

export default Result;

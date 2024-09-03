'use client';
import { useDebugStore } from '../../../stores';
import { Box } from '@chakra-ui/react';

const Debugger = () => {
  const { result } = useDebugStore();

  return (
    <Box
      display={'flex'}
      padding={'10px'}
      backgroundColor={'#fff'}
      border={'solid 1px black'}
      borderRadius={'8px'}
      overflow={'auto'}
      width={'100%'}
    >
      <pre
        style={{
          width: '100%',
        }}
      >
        <code>{JSON.stringify(result, null, 2)}</code>
      </pre>
    </Box>
  );
};

export default Debugger;

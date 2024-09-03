import React from 'react';
import { Box } from '@chakra-ui/layout';
import Styles from './Main.module.scss';

export const Main = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Box
      className={Styles.Main}
      flex={1}
      minW={200}
      height={'100vh'}
      overflow={'hidden'}
      backgroundColor={'background'}
    >
      {children}
    </Box>
  );
};

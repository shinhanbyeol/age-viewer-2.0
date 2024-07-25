import { ChakraProvider } from '@chakra-ui/react';

import theme from '../lib/theme';
import { AppProps } from 'next/app';

// layout
import { Container } from '../layout/Container';
import { Sidebar } from '../layout/Sidebar/Sidebar';
// material
import { Divider } from '@chakra-ui/react';
// hook
import { useResizable } from 'react-resizable-layout';
// css
import './common.css';

function MyApp({ Component, pageProps }: AppProps) {
  const { position, separatorProps } = useResizable({
    axis: 'x',
  });
  return (
    <ChakraProvider theme={theme}>
      <Container>
        <Sidebar x={position} />
        <Divider
          orientation="vertical"
          width={1}
          height={'100vh'}
          _hover={{
            bg: 'blue.500',
            cursor: 'ew-resize',
          }}
          {...separatorProps}
        />
        <Component {...pageProps} />
      </Container>
    </ChakraProvider>
  );
}

export default MyApp;

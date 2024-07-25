import { Box, Flex, Icon } from '@chakra-ui/react';
import Styles from './Sidebar.module.scss';
import { useState } from 'react';
import { useRouter } from 'next/router';
import SidebarRenderer from '../../components/sidebar';

//icons
import { MdHome, MdBugReport } from 'react-icons/md';

interface SidebarProps {
  x: number;
}
export const Sidebar = ({ x }: SidebarProps) => {
  const [sidebar, setSidebar] = useState<string | number>('home');
  const router = useRouter();

  return (
    <Box className={Styles.Root} minW={240} width={x} resize="both">
      <Flex direction="row" justify="flex-start" align="center">
        <Flex
          minW={50}
          height={'100vh'}
          direction="column"
          backgroundColor={'gray'}
        >
          <Box
            width={50}
            height={50}
            bg="blue.300"
            textAlign={'center'}
            p={'25%'}
            _hover={{
              bg: 'blue.500',
              cursor: 'pointer',
            }}
            onClick={() => {
              setSidebar('home');
              // router.push('/home');
            }}
          >
            <Icon as={MdHome} />
          </Box>
          <Box
            width={50}
            height={50}
            bg="blue.300"
            textAlign={'center'}
            p={'25%'}
            _hover={{
              bg: 'blue.500',
              cursor: 'pointer',
            }}
            onClick={() => {
              setSidebar(2);
            }}
          >
            2
          </Box>
          <Box
            width={50}
            height={50}
            bg="blue.300"
            textAlign={'center'}
            p={'25%'}
            _hover={{
              bg: 'blue.500',
              cursor: 'pointer',
            }}
            onClick={() => {
              setSidebar(3);
            }}
          >
            3
          </Box>
          <Box
            width={50}
            height={50}
            bg="blue.300"
            textAlign={'center'}
            p={'25%'}
            _hover={{
              bg: 'blue.500',
              cursor: 'pointer',
            }}
            onClick={() => {
              setSidebar('debug');
              router.push('/debug');
            }}
          >
            <Icon as={MdBugReport} />
          </Box>
        </Flex>
        <Box overflowY={'auto'} width={'100%'} height={'100vh'}>
          <SidebarRenderer contents={sidebar} />
        </Box>
      </Flex>
    </Box>
  );
};

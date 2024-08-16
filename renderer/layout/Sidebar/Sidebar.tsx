import { Box, forwardRef, Flex, Icon, BoxProps } from '@chakra-ui/react';
import Styles from './Sidebar.module.scss';
import { useState } from 'react';
import { useRouter } from 'next/router';
import SidebarRenderer from '../../components/sidebar';

//icons
import { FcHome, FcSupport, FcEditImage } from 'react-icons/fc';

interface SidebarProps {
  x: number;
}

const MenuItemBox = forwardRef<BoxProps, 'div'>((props, ref) => (
  <Box
    width={50}
    height={50}
    bg="#212121"
    textAlign={'center'}
    p={'25%'}
    fontSize={'x-large'}
    _hover={{
      bg: 'linear-gradient(51deg, rgba(14,127,254,1) 11%, rgba(19,127,255,1) 50%);',
      cursor: 'pointer',
    }}
    {...props}
    ref={ref}
  />
));

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
          backgroundColor={'#212121'}
        >
          <MenuItemBox
            onClick={() => {
              setSidebar('home');
              // router.push('/home');
            }}
          >
            <Icon as={FcHome} />
          </MenuItemBox>
          <MenuItemBox
            onClick={() => {
              setSidebar(2);
            }}
          >
            <Icon as={FcEditImage} />
          </MenuItemBox>
          <MenuItemBox
            onClick={() => {
              setSidebar(3);
            }}
          >
            3
          </MenuItemBox>
          <MenuItemBox
            onClick={() => {
              setSidebar('debug');
              router.push('/debug');
            }}
          >
            <Icon as={FcSupport} />
          </MenuItemBox>
        </Flex>
        <Box overflowY={'auto'} width={'100%'} height={'100vh'}>
          <SidebarRenderer contents={sidebar} />
        </Box>
      </Flex>
    </Box>
  );
};

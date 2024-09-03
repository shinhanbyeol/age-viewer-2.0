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

const MenuItemBox = forwardRef<
  {
    active?: boolean;
  } & BoxProps,
  'div'
>((props, ref) => (
  <Box
    width={50}
    height={50}
    bg={props.active ? 'background' : 'black'}
    textAlign={'center'}
    p={'25%'}
    fontSize={'x-large'}
    _hover={{
      bg: 'background',
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
    <Box
      className={Styles.Root}
      minW={240}
      width={x}
      resize="both"
      backgroundColor={'background'}
    >
      <Flex direction="row" justify="flex-start" align="center">
        <Flex
          minW={50}
          height={'100vh'}
          direction="column"
          backgroundColor={'black'}
        >
          <MenuItemBox
            active={sidebar === 'home'}
            onClick={() => {
              setSidebar('home');
              // router.push('/home');
            }}
          >
            <Icon as={FcHome} />
          </MenuItemBox>
          <MenuItemBox
            active={sidebar === 2}
            onClick={() => {
              setSidebar(2);
            }}
          >
            <Icon as={FcEditImage} />
          </MenuItemBox>
          <MenuItemBox
            active={sidebar === 3}
            onClick={() => {
              setSidebar(3);
            }}
          >
            3
          </MenuItemBox>
          <MenuItemBox
            active={sidebar === 'debug'}
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

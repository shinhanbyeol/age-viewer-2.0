import { Box } from '@chakra-ui/layout';

export const Main = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Box flex={1} minW={200}>
      {children}
    </Box>
  );
};

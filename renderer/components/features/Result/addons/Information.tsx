import { Box, Flex, Button, Text, IconButton } from '@chakra-ui/react';
import { useGraphologyStore } from '../../../../stores';
import { useWorkspaceStore } from '../../../../stores/workspaceStore';
import { PiX } from 'react-icons/pi';

function Information({
  selectedObjects,
  close,
}: {
  selectedObjects: string[];
  close: () => void;
}) {
  const graphology = useGraphologyStore((state) => state.graphology);
  const { designer } = useWorkspaceStore();

  // current 1 item view in futer will be multiple
  const firstItem = selectedObjects[0];

  const type = graphology.hasNode(firstItem)
    ? 'Node'
    : graphology.hasEdge(firstItem)
    ? 'Edge'
    : 'Unknown';

  const properties =
    type === 'Node'
      ? graphology.getNodeAttributes(firstItem).properties
      : type === 'Edge'
      ? graphology.getEdgeAttributes(firstItem).properties
      : 'Unknown';

  const label =
    type === 'Node'
      ? graphology.getNodeAttributes(firstItem).label
      : type === 'Edge'
      ? graphology.getEdgeAttributes(firstItem).label
      : 'Unknown';

  const style = designer[label] ?? undefined;

  return type === 'Unknown' ? (
    <></>
  ) : (
    <Box
      pos={'absolute'}
      right={16}
      bottom={24}
      padding={'0.5rem'}
      borderRadius={'8px'}
      backgroundColor={'#fff'}
      marginLeft={'1rem'}
      maxH={'50%'}
      minW={'300px'}
      bg={'#ffffff99'}
      color={'black'}
      borderColor={'black'}
      borderWidth={1}
    >
      <Flex justifyContent={'space-between'} mb={2}>
        <Box
          bg={style?.color ?? 'black'}
          w={'fit-content'}
          pl={4}
          pr={4}
          mb={2}
          borderRadius={'24px'}
        >
          <Text color={'Background'} fontSize={'lg'} fontWeight={'bold'}>
            {label}
          </Text>
        </Box>
        <IconButton aria-label="Close" icon={<PiX />} onClick={() => close()} />
      </Flex>
      <Box fontSize={'md'}>
        {Object.entries(properties).map(([key, value]: any) => (
          <Box>
            {key} : {value ?? ''}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Information;

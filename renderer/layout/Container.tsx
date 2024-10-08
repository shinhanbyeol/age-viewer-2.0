import { Flex, FlexProps } from '@chakra-ui/react'

export const Container = (props: FlexProps) => (
  <Flex
    direction="row"
    bg="gray.50"
    color="black"
    _dark={{
      bg: 'gray.900',
      color: 'background',
    }}
    transition="all 0.15s ease-out"
    {...props}
  />
)

import { Box, Flex } from "@chakra-ui/react";
import Styles from "./Sidebar.module.scss";
import { useState } from "react";

interface SidebarProps {
  x: number;
}
export const Sidebar = ({ x }) => {
  const [sidebar, setSidebar] = useState(1);
  
  return (
    <Box className={Styles.Root} minW={240} width={x} resize="both">
      <Flex direction="row" justify="flex-start" align="center">
        <Flex minW={50} height={"100vh"} direction="column" backgroundColor={"gray"}>
          <Box
            width={50}
            height={50}
            bg="blue.300"
            textAlign={"center"}
            p={"25%"}
            _hover={{
              bg: "blue.500",
              cursor: "pointer",
            }}
            onClick={() => {
              setSidebar(1);
            }}
          >
            1
          </Box>
          <Box
            width={50}
            height={50}
            bg="blue.300"
            textAlign={"center"}
            p={"25%"}
            _hover={{
              bg: "blue.500",
              cursor: "pointer",
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
            textAlign={"center"}
            p={"25%"}
            _hover={{
              bg: "blue.500",
              cursor: "pointer",
            }}
            onClick={() => {
              setSidebar(3);
            }}
          >
            3
          </Box>
        </Flex>
        <Box>
          sidebar contetns {sidebar}
        </Box>
      </Flex>
    </Box>
  );
};

import { useRef } from "react";
import { Container, Drawer, DrawerContent, DrawerOverlay, Flex, Hide, useDisclosure } from "@chakra-ui/react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children, title }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const toggleOpen = () => {
    setOpen(!isOpen);
  };

  return (
    <>
      <Flex flexDir="row">
        <Hide below="md">
          <Sidebar />
        </Hide>
        <Flex w="full" flexDir="column">
          <Navbar title={title || "App"} btnRef={btnRef} onOpen={onOpen} />
          <Container maxW="container.xl" py={3}>
            {children}
          </Container>
        </Flex>
      </Flex>

      <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <Sidebar />
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Layout;

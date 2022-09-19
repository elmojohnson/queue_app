import { Container, Flex } from "@chakra-ui/react";

import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <Flex w="full" flexDir="column">
      <Navbar />
      <Container maxW="container.sm">
        {children}
      </Container>
    </Flex>
  );
};

export default Layout;

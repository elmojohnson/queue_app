import { Flex, Spinner } from "@chakra-ui/react";
import React from "react";

const LoadingScreen = () => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      h="70vh"
      justifyContent="center"
    >
      <Spinner size="lg" />
    </Flex>
  );
};

export default LoadingScreen;

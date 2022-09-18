import { Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { FaSpotify } from "react-icons/fa";

const Login = () => {
  return (
    <Flex h="100vh" justifyContent="center" alignItems="center">
      <VStack spacing={2}>
        <Heading>App Name</Heading>
        <Text>Please login your Spotify Account</Text>
        <Button colorScheme="green" leftIcon={<FaSpotify />}>
          Login with Spotify
        </Button>
      </VStack>
    </Flex>
  );
};

export default Login;

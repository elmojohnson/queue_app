import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react";

import { Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { FaSpotify } from "react-icons/fa";

const Login = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const loginUser = () => {
    signIn("spotify", { redirect: "/" });
  };

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);

  return (
    <Flex h="100vh" justifyContent="center" alignItems="center">
      <VStack spacing={2}>
        <Heading>Queuellab</Heading>
        <Text>Please login your Spotify Account</Text>
        <Button colorScheme="green" leftIcon={<FaSpotify />} onClick={loginUser}>
          Login with Spotify
        </Button>
      </VStack>
    </Flex>
  );
};

export default Login;

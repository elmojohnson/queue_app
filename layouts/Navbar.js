import {
  Avatar,
  Box,
  Container,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Progress,
  Spacer,
  Text,
} from "@chakra-ui/react";

import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  const logoutUser = async () => {
    const data = await signOut({
      redirect: false,
      callbackUrl: "/account/login",
    });
    router.push(data.url);
  };

  useEffect(() => {
    router.isReady && setLoading(false);
  }, [router]);

  return (
    <>
      <Box bg="teal" py={4} position="sticky" top={0} zIndex={50} shadow="md">
        <Container maxW="container.sm" color="white">
          <HStack>
            <Text
              fontSize={20}
              fontWeight="bold"
              _hover={{ cursor: "pointer" }}
              onClick={() => router.push("/")}
            >
              Queue App
            </Text>
            <Spacer />
            <Box>
              <Menu direction="ltr">
                <MenuButton>
                  <Avatar size="sm" bg="teal.400" />
                </MenuButton>
                <MenuList color="black">
                  <MenuItem onClick={() => router.push("/account")}>
                    Account
                  </MenuItem>
                  <MenuItem onClick={logoutUser}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </HStack>
        </Container>
      </Box>
      {isLoading && <Progress size="xs" isIndeterminate colorScheme="blackAlpha" />}
    </>
  );
};

export default Navbar;

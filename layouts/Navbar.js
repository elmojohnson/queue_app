import {
  Avatar,
  Box,
  Container,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
} from "@chakra-ui/react";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const { data: sesssion } = useSession();

  const logoutUser = async () => {
    const data = await signOut({
      redirect: false,
      callbackUrl: "/account/login",
    });
    router.push(data.url);
  };

  return (
    <Box bg="teal" py={4} position="sticky" top={0} zIndex={50} shadow="md">
      <Container maxW="container.sm" color="white">
        <HStack>
          <Text fontSize={20} fontWeight="bold" _hover={{cursor: "pointer"}} onClick={() => router.push("/")}>
            Queue App
          </Text>
          <Spacer />
          <Box>
            <Menu direction="ltr">
              <MenuButton>
                <Avatar size="sm" bg="teal.400" />
              </MenuButton>
              <MenuList color="black">
                <MenuItem onClick={() => router.push("/account")}>Account</MenuItem>
                <MenuItem onClick={logoutUser}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </HStack>
      </Container>
    </Box>
  );
};

export default Navbar;

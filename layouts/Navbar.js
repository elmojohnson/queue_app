import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

import {
  Avatar,
  Box,
  Container,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Progress,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { MdOutlineQueueMusic, MdLogout } from "react-icons/md";
import { HiExternalLink } from "react-icons/hi";
import useShowSpotifyAccount from "../hooks/user/useShowSpotifyAccount";

const Navbar = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const { data: session } = useSession();
  const showProfile = useShowSpotifyAccount();

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
      <Box bg="white" py={4} position="sticky" top={0} zIndex={50} shadow="md">
        <Container maxW="container.sm" color="purple.500">
          <HStack>
            <Icon fontSize={30} as={MdOutlineQueueMusic} />
            <Text
              fontSize={20}
              fontWeight="bold"
              _hover={{ cursor: "pointer" }}
              onClick={() => router.push("/")}
            >
              Queuellab
            </Text>
            <Spacer />
            <Box>
              <Menu direction="ltr">
                <MenuButton>
                  <Avatar
                    size="sm"
                    bg="purple.500"
                    src={session?.user?.image}
                    name={session?.user?.name}
                  />
                </MenuButton>
                <MenuList color="black">
                  <MenuItem
                    icon={<Icon as={HiExternalLink} />}
                    onClick={showProfile}
                  >
                    Account
                  </MenuItem>
                  <MenuItem icon={<Icon as={MdLogout} />} onClick={logoutUser}>
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </HStack>
        </Container>
      </Box>
      {isLoading && (
        <Progress size="xs" isIndeterminate colorScheme="blackAlpha" />
      )}
    </>
  );
};

export default Navbar;

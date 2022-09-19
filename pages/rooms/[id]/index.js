import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { HiDotsVertical } from "react-icons/hi";
import { useRouter } from "next/router";
import React from "react";
import Layout from "../../../layouts/Layout";

const Room = () => {
  const router = useRouter();
  return (
    <Layout>
      <Box>
        <Flex>
          <Text fontWeight="bold" fontSize={20}>
            Room Name
          </Text>
          <Spacer />
          <Menu>
            <MenuButton as={IconButton} icon={<Icon as={HiDotsVertical} />}>
              Settings
            </MenuButton>
            <MenuList>
              <MenuItem>Members</MenuItem>
              <MenuItem>Info</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Box>
    </Layout>
  );
};

export default Room;

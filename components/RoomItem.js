import {
  Box,
  Avatar,
  AvatarGroup,
  Text,
  VStack,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import React from "react";

const RoomItem = ({ name, host, members }) => {
  return (
    <Box
      p={4}
      bg="white"
      borderWidth="1px"
      borderRadius="md"
      _hover={{ shadow: "md", cursor: "pointer" }}
    >
      <VStack w="full" align="stretch" spacing={0}>
        <Text
          fontSize={20}
          fontWeight="bold"
          color="teal"
          noOfLines={1}
        >
          {name}
        </Text>
        <HStack>
          <Text>{host}</Text>
          <Spacer />
          <AvatarGroup size="sm" max={2}>
            <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
            <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
            <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
            <Avatar
              name="Prosper Otemuyiwa"
              src="https://bit.ly/prosper-baba"
            />
            <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
          </AvatarGroup>
        </HStack>
      </VStack>
    </Box>
  );
};

export default RoomItem;

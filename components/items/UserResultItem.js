import useCheckMember from "../../hooks/member/useCheckMember";
import useAddMember from "../../hooks/member/useAddMember";

import {
  Avatar,
  Box,
  Button,
  HStack,
  Icon,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MdPersonAdd, MdCheck } from "react-icons/md";
import { useEffect, useState } from "react";

const UserResultItem = ({ user }) => {
  const isMember = useCheckMember(user.spotifyId);
  const {addUser, isAdded, isAdding} = useAddMember(user);

  return (
    <VStack spacing={2} alignItems="start">
      <Text fontWeight="bold">Search Result:</Text>
      <Box w="full">
        <HStack>
          <Avatar src={user.image} name={user.name} />
          <VStack alignItems="start" spacing={0}>
            <Text fontSize={18} fontWeight="semibold">
              {user.name}
            </Text>
            <Text fontSize={14}>{user.email}</Text>
          </VStack>
          <Spacer />
          {!isMember && !isAdded ? (
            <Button
              size="sm"
              leftIcon={<Icon as={MdPersonAdd} />}
              variant="outline"
              onClick={addUser}
              isLoading={isAdding}
              disabled={isAdding}
              loadingText="Adding"
            >
              Add
            </Button>
          ) : <MdCheck color="green" />}
        </HStack>
      </Box>
    </VStack>
  );
};

export default UserResultItem;

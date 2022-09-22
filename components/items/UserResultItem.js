import { useRouter } from "next/router";

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
import { useAddMember } from "../../hooks/member/useAddMember";
import { useEffect, useState } from "react";
import { useCheckMember } from "../../hooks/member/useCheckMember";

const UserResultItem = ({ user }) => {
  const router = useRouter();
  const [isJoined, setJoined] = useState(false);
  const [isAdding, setAdding] = useState(false);

  const checkUserMembership = async () => {
    const isMember = await useCheckMember(user.spotifyId, router?.query?.id);
    setJoined(isMember);
    console.log(isMember);
  };

  const addUser = async () => {
    try {
      const { roomId, user: us } = await useAddMember(router?.query?.id, user);
      console.log(us);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkUserMembership();
  }, []);

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
          {!isJoined ? (
            <Button
              size="sm"
              leftIcon={<Icon as={MdPersonAdd} />}
              variant="outline"
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

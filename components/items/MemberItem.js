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
import { useContext } from "react";
import { MdPersonRemove } from "react-icons/md";

import RoomContext from "../../contexts/RoomContext";
import { useSession } from "next-auth/react";

const MemberItem = ({ user }) => {
  const roomContext = useContext(RoomContext);
  const { data: session } = useSession();
  // user.member_id - firestore doc id
  return (
    <Box w="full">
      <HStack alignItems="start">
        <Avatar src={user.image} name={user.name} />
        <VStack alignItems="start" spacing={0}>
          <Text fontSize={14} fontWeight="semibold">
            {`${user.name} ${user.id === roomContext.host.id ? "(Host)" : ""}`}
          </Text>
          <Text fontSize={10}>{user.email}</Text>
        </VStack>
        <Spacer />
        {session?.user?.email === roomContext.host.email && session?.user?.email !== user.email ? (
          <Button
            size="xs"
            leftIcon={<Icon as={MdPersonRemove} />}
            variant="outline"
          >
            Remove
          </Button>
        ) : null}
      </HStack>
    </Box>
  );
};

export default MemberItem;

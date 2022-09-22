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
import { MdPersonRemove } from "react-icons/md";

const MemberItem = ({ user }) => {
  // user.member_id - firestore doc id
  return (
    <Box w="full">
      <HStack alignItems="start">
        <Avatar src={user.image} name={user.name} />
        <VStack alignItems="start" spacing={0}>
          <Text fontSize={14} fontWeight="semibold">
            {user.name}
          </Text>
          <Text fontSize={10}>{user.email}</Text>
        </VStack>
        <Spacer />
        <Button
          size="xs"
          leftIcon={<Icon as={MdPersonRemove} />}
          variant="outline"
        >
          Remove
        </Button>
      </HStack>
    </Box>
  );
};

export default MemberItem;

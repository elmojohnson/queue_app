import { useContext } from "react";
import RoomContext from "../../contexts/RoomContext";
import { useSession } from "next-auth/react";
import useMembers from "../../hooks/member/useMembers";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Box,
  HStack,
  Avatar,
  VStack,
  Stack,
  Button,
  Icon,
  AvatarGroup,
  ModalFooter,
  Switch,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import useDeleteRoom from "../../hooks/room/useDeleteRoom";

const RoomInfoModal = ({ isOpen, onClose }) => {
  const room = useContext(RoomContext);
  const { data: session } = useSession();
  const { members, isLoading } = useMembers();
  const { deleteRoom, isDeleting } = useDeleteRoom();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{room.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack alignItems="start" spacing={8}>
            <Stack>
              <Text fontSize={14} fontWeight="bold">
                Members:
              </Text>
              {!isLoading && (
                <AvatarGroup max={8}>
                  {members?.map((member) => {
                    return (
                      <Avatar
                        key={member.id}
                        src={member.image}
                        name={member.name}
                      />
                    );
                  })}
                </AvatarGroup>
              )}
            </Stack>
            <Stack>
              <Text fontSize={14} fontWeight="bold">
                Host:
              </Text>
              <Box w="full">
                <HStack alignItems="start">
                  <Avatar src={room.host.image} name={room.host.name} />
                  <VStack alignItems="start" spacing={0}>
                    <Text fontSize={14} fontWeight="semibold">
                      {room.host.name}
                    </Text>
                    <Text fontSize={10}>{room.host.email}</Text>
                  </VStack>
                </HStack>
              </Box>
            </Stack>
            {session?.user?.email === room.host.email && (
              <Stack w="full">
                <Text fontSize={14} fontWeight="bold">
                  Settings:
                </Text>
                <VStack alignItems="start" spacing={4}>
                  <FormControl
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <FormLabel>Auto Queue</FormLabel>
                    <Switch isChecked={room.isAutoQueue} />
                  </FormControl>
                  <Button
                    w="full"
                    size="sm"
                    colorScheme="blackAlpha"
                    leftIcon={<Icon as={MdDelete} />}
                    isLoading={isDeleting}
                    loadingText="Deleting"
                    disabled={isDeleting}
                    onClick={deleteRoom}
                  >
                    Delete Room
                  </Button>
                </VStack>
              </Stack>
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default RoomInfoModal;

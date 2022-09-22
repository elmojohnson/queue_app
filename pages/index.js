// Hooks
import { useRouter } from "next/router";
import { useRooms } from "../hooks/room/useRooms";

// Component & Layout
import RoomItem from "../components/RoomItem";
import Layout from "../layouts/Layout";

// UI Components
import {
  Button,
  Flex,
  HStack,
  VStack,
  Spacer,
  Heading,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import CreateRoomModal from "../components/modals/CreateRoomModal";

const Home = () => {
  const rooms = useRooms();
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Layout>
      <Flex direction="column" py={3} gap={3}>
        <HStack>
          <Heading size="lg">Rooms</Heading>
          <Spacer />
          <Button
            size="sm"
            alignSelf="end"
            leftIcon={<Icon as={MdAdd} />}
            colorScheme="green"
            onClick={onOpen}
          >
            Create
          </Button>
        </HStack>
        <VStack spacing={4} align="stretch">
          {rooms.map((room, i) => {
            return <RoomItem key={i} name={room.name} host={room.host} />;
          })}
        </VStack>
      </Flex>

      <CreateRoomModal isOpen={isOpen} onClose={onClose} />
    </Layout>
  );
};

export default Home;

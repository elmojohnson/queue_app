// Hooks
import useRooms from "../hooks/room/useRooms";

// Component & Layout
import RoomItem from "../components/items/RoomItem";
import CreateRoomModal from "../components/modals/CreateRoomModal";
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
import LoadingScreen from "../components/utils/LoadingScreen";

const Home = () => {
  const { rooms, isLoading } = useRooms();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <VStack spacing={4} align="stretch">
            {rooms.map((room) => {
              return (
                <RoomItem
                  key={room.id}
                  id={room.id}
                  name={room.name}
                  host={room.host}
                />
              );
            })}
          </VStack>
        )}
      </Flex>

      <CreateRoomModal isOpen={isOpen} onClose={onClose} />
    </Layout>
  );
};

export default Home;

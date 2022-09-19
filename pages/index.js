import React, { useState } from "react";
import { useRouter } from "next/router";

import RoomItem from "../components/RoomItem";
import Layout from "../layouts/Layout";

import {
  Button,
  Flex,
  HStack,
  VStack,
  Spacer,
  Heading,
  Icon,
} from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";

const Home = () => {
  const router = useRouter();
  const [rooms, setRooms] = useState([
    {
      name: "Room 1",
      host: "Host 1",
    },
    {
      name: "Room 2",
      host: "Host 2",
    },
    {
      name: "Room 3",
      host: "Host 3",
    },
    {
      name: "Room 4",
      host: "Host 4",
    },
    {
      name: "Room 5",
      host: "Host 5",
    },
    {
      name: "Room 5",
      host: "Host 5",
    },
    {
      name: "Room 5",
      host: "Host 5",
    },
    {
      name: "Room 5",
      host: "Host 5",
    },
    {
      name: "Room 5",
      host: "Host 5",
    },
  ]);

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
            onClick={() => router.push("/room/create")}
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
    </Layout>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

// UI Components
import { Box } from "@chakra-ui/react";

// Layouts and Components
import LoadingScreen from "../../../components/utils/LoadingScreen";
import Layout from "../../../layouts/Layout";

// Custom hooks
import { useViewRoom } from "../../../hooks/room/useViewRoom";
import ViewRoomNav from "../../../components/navigation/ViewRoomNav";

const Room = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [isLoading, setLoading] = useState(false);

  const getRoom = async () => {
    setLoading(true);
    try {
      const room = await useViewRoom(router.query.id);
      setName(room.name);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    router.isReady && getRoom();
  }, [router]);

  if (isLoading) {
    return (
      <Layout>
        <LoadingScreen />
      </Layout>
    );
  }

  return (
    <Layout>
      <ViewRoomNav name={name} />

      <Box>asd</Box>
    </Layout>
  );
};

export default Room;

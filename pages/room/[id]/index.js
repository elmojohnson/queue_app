// UI Components
import { Box } from "@chakra-ui/react";

// Layouts and Components
import LoadingScreen from "../../../components/utils/LoadingScreen";
import Layout from "../../../layouts/Layout";
import ViewRoomNav from "../../../components/navigation/ViewRoomNav";

// Custom hooks
import useViewRoom from "../../../hooks/room/useViewRoom";
import RoomContext from "../../../contexts/RoomContext";

const Room = () => {
  const { room, isLoading } = useViewRoom();

  if (isLoading) {
    return (
      <Layout>
        <LoadingScreen />
      </Layout>
    );
  }

  return (
    <RoomContext.Provider value={room}>
      <Layout>
        <ViewRoomNav />

        <Box>asd</Box>
      </Layout>
    </RoomContext.Provider>
  );
};

export default Room;

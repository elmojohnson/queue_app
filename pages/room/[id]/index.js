// UI Components
import { Box, VStack } from "@chakra-ui/react";

// Layouts and Components
import LoadingScreen from "../../../components/utils/LoadingScreen";
import Layout from "../../../layouts/Layout";
import ViewRoomNav from "../../../components/navigation/ViewRoomNav";

// Custom hooks
import useViewRoom from "../../../hooks/room/useViewRoom";
import RoomContext from "../../../contexts/RoomContext";
import useTracks from "../../../hooks/tracks/useTracks";
import TrackItem from "../../../components/items/TrackItem";

const Room = () => {
  const { room, isLoading } = useViewRoom();
  const { tracks, isLoading: isTrackLoading } = useTracks();

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

        <Box py={3}>
          {isTrackLoading ? (
            <p>loading...</p>
          ) : (
            <VStack spacing={6}>
              {tracks.map((track) => {
                return (
                  <TrackItem
                    key={track.id}
                    id={track.id}
                    uri={track.uri}
                    name={track.name}
                    artists={track.artists}
                    image={track.image}
                    user={track.addedBy}
                    date={track.requested_at}
                    isQueued={track.isQueued}
                  />
                );
              })}
            </VStack>
          )}
        </Box>
      </Layout>
    </RoomContext.Provider>
  );
};

export default Room;

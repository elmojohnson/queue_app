import { useState } from "react";
import { useRouter } from "next/router";

import { useAccessToken } from "../user/useAccessToken";
import useCredentials from "../user/useCredentials";
import { spotify } from "../../utils/spotify";

import { db } from "../../utils/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useToast } from "@chakra-ui/react";

const useAddToQueue = (id, uri) => {
  const router = useRouter();
  const [isQueueing, setQueueing] = useState(false);
  const { refreshToken } = useCredentials();
  const toast = useToast();

  const addToQueue = async () => {
    setQueueing(true);

    try {
      // Player
      const accessToken = await useAccessToken(refreshToken);
      spotify.setAccessToken(accessToken);
      const myDevices = await spotify.getMyDevices();

      if (myDevices.devices.length === 0) {
        toast({
          title: "No device found to queue this track!",
          description: "Make sure you have Spotify playing on your device.",
          status: "warning",
          duration: 5000,
          isClosable: true
        });
      } else {
        await spotify.queue(uri);
        // DB
        await updateDoc(doc(db, "rooms", router?.query?.id, "tracks", id), {
          isQueued: true,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setQueueing(false);
    }
  };

  return { addToQueue, isQueueing };
};

export default useAddToQueue;

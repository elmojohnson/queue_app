import { useState } from "react";
import { useRouter } from "next/router";

import { useAccessToken } from "../user/useAccessToken";
import useCredentials from "../user/useCredentials";
import { spotify } from "../../utils/spotify";

import { db } from "../../utils/firebase";
import { doc, updateDoc } from "firebase/firestore";

const useAddToQueue = (id, uri) => {
  const router = useRouter();
  const [isQueueing, setQueueing] = useState(false);

  const { refreshToken } = useCredentials();

  const addToQueue = async () => {
    setQueueing(true);

    try {
      // Player
      const accessToken = await useAccessToken(refreshToken);
      spotify.setAccessToken(accessToken);
      await spotify.queue(uri);

      // DB
      await updateDoc(doc(db, "rooms", router?.query?.id, "tracks", id), {
        isQueued: true,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setQueueing(false);
    }
  };

  return { addToQueue, isQueueing };
};

export default useAddToQueue;

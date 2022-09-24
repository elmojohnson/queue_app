import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { db } from "../../utils/firebase";
import {
  doc,
  updateDoc,
  arrayUnion,
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";

const useRequestTrack = (uri, name, artists, image) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isAdding, setAdding] = useState(false);
  const [isAdded, setAdded] = useState(false);

  const requestTrack = async () => {
    setAdding(true);
    try {
      const roomRef = doc(db, "rooms", router?.query?.id);

      // Add to tracks subcollection
      const trackRef = collection(roomRef, "tracks");
      addDoc(trackRef, {
        uri,
        name,
        artists,
        image,
        addedBy: session?.user,
        isQueued: false,
        requested_at: Timestamp.now(),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setAdded(true);
      setAdding(false);
    }
  };

  return { requestTrack, isAdding, isAdded };
};

export default useRequestTrack;

import { db } from "../../utils/firebase";
import {
  doc,
  updateDoc,
  arrayUnion,
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { useState } from "react";
import {useRouter} from "next/router";

const useAddMember = (user) => {
  const router = useRouter();
  const [isAdded, setAdded] = useState(false);
  const [isAdding, setAdding] = useState(false);

  const addUser = async () => {
    setAdding(true);
    try {
      const roomRef = doc(db, "rooms", router?.query?.id);

      // Update array
      await updateDoc(roomRef, {
        members: arrayUnion(user.spotifyId),
      });

      // Add to members subcollection
      const memRef = collection(roomRef, "members");
      addDoc(memRef, {
        spotifyId: user.spotifyId,
        name: user.name,
        email: user.email,
        image: user.image,
        isHost: false,
        joined_at: Timestamp.now(),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setAdded(true);
      setAdding(false);
    }
  };

  return { addUser, isAdded, isAdding };
};

export default useAddMember;

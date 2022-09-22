import { db } from "../../utils/firebase";
import {
  doc,
  updateDoc,
  arrayUnion,
  collection,
  addDoc,
  Timestamp
} from "firebase/firestore";

export const useAddMember = async (roomId, user) => {
  let isAdded = false;

  const roomRef = doc(db, "rooms", roomId);
  // collection(db, "rooms", router.query.id, "members")

  // Update array
  await updateDoc(roomRef, {
    members: arrayUnion(user.spotifyId),
  });

  // Add to members subcollection
  const memRef = collection(roomRef, "members");
  addDoc(memRef, {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    isHost: false,
    joined_at: Timestamp.now(),
  });

  isAdded = true;

  return isAdded;
};

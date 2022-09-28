// Firebase
import { db } from "../../utils/firebase";
import { doc, addDoc, setDoc, Timestamp, collection } from "firebase/firestore";

export const useCreateRoom = async (name, user, userId) => {
    let response = {};
  try {
    const roomRef = doc(collection(db, "rooms"));
    const memberRef = collection(roomRef, "members");

    await setDoc(roomRef, {
      name,
      host: {
        id: userId,
        name: user.name,
        email: user.email,
        image: user.image || null,
      },
      members: [userId],
      created_at: Timestamp.now(),
    });

    addDoc(memberRef, {
      spotifyId: userId,
      name: user.name,
      email: user.email,
      image: user.image || null,
      isHost: true,
      joined_at: Timestamp.now(),
    });

    response = {
      title: "Room Created!",
      status: "success",
      isClosable: true,
    };
  } catch (error) {
    console.log(error);
    response = {
      title: "There was a problem creating the room. Try again!",
      status: "error",
      isClosable: true,
    };
  }

  return response;
};

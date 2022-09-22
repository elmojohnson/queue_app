// Firebase
import { db } from "../../utils/firebase";
import { doc, addDoc, setDoc, Timestamp, collection } from "firebase/firestore";

export const useCreateRoom = async (name, user) => {
    let response = {};
  try {
    const roomRef = doc(collection(db, "rooms"));
    const memberRef = collection(roomRef, "members");

    await setDoc(roomRef, {
      name,
      host: {
        name: user.name,
        email: user.email,
        image: user.image,
      },
      members: [user.email],
      created_at: Timestamp.now(),
    });

    await addDoc(memberRef, {
      name: user.name,
      email: user.email,
      image: user.image,
      isHost: true,
      joined_at: Timestamp.now(),
    });

    response = {
      title: "Account Created!",
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

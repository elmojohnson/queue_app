// Firebase
import { db } from "../../utils/firebase";
import { query, where, getDocs, collection } from "firebase/firestore";
import { useViewRoom } from "../room/useViewRoom";

export const useCheckMember = async (spotify_id, room_id) => {
  let isMember = false;
  const room = await useViewRoom(room_id);

  try {
    const roomQuery = query(
      collection(db, "rooms"),
      where("members", "array-contains", spotify_id),
      where("name", "==", room.name)
    );
    const roomSnapshot = await getDocs(roomQuery);

    let count = 0;

    roomSnapshot.forEach((doc) => {
      count++;
    });

    if(count == 1) {
        isMember = true;
    }

  } catch (error) {
    console.error(error);
  }

  return isMember;
};

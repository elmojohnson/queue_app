// Firebase
import { db } from "../../utils/firebase";
import { query, where, getDocs, collection } from "firebase/firestore";
import useViewRoom from "../room/useViewRoom";
import { useEffect, useState } from "react";

const useCheckMember = (spotify_id) => {
  const [isMember, setIsMember] = useState(false);
  const { room, isLoading } = useViewRoom();

  const check = async () => {
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

      if (count == 1) {
        setIsMember(true);
      } else {
        setIsMember(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    !isLoading && check();
  }, [spotify_id]);

  return isMember;
};

export default useCheckMember;

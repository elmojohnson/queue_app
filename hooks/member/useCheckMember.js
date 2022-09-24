// Firebase
import { db } from "../../utils/firebase";
import {
  query,
  where,
  getDocs,
  collection,
  onSnapshot,
} from "firebase/firestore";
import useViewRoom from "../room/useViewRoom";
import { useEffect, useState } from "react";

const useCheckMember = (spotify_id) => {
  const [isMember, setIsMember] = useState(false);
  const { room, isLoading } = useViewRoom();

  const check = () => {
    const roomQuery = query(
      collection(db, "rooms"),
      where("members", "array-contains", spotify_id),
      where("name", "==", room.name)
    );

    onSnapshot(roomQuery, (qs) => {
      let count = 0;

      qs.forEach((doc) => {
        count++;
      });

      if (count == 1) {
        setIsMember(true);
      } else {
        setIsMember(false);
      }
    });
  };

  useEffect(() => {
    check();
  }, [isLoading, spotify_id]);

  return isMember;
};

export default useCheckMember;

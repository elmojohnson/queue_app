import { useState, useEffect } from "react";
import { db } from "../../utils/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useCredentials } from "../user/useCredentials";

const useRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const getRooms = async () => {
    setLoading(true);
    
    const credentials = await useCredentials();
    const roomQuery = query(
      collection(db, "rooms"),
      where("members", "array-contains", credentials.providerAccountId)
    );

    onSnapshot(roomQuery, (qs) => {
      let arr = [];

      qs.forEach((doc) => {
        arr.push({ id: doc.id, ...doc.data() });
      });

      setRooms(arr);
    });

    setLoading(false);
  };

  useEffect(() => {
    getRooms();
  }, []);

  return { rooms, isLoading };
};

export default useRooms;

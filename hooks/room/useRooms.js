import { useState, useEffect } from "react";
import { db } from "../../utils/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import useCredentials from "../user/useCredentials";

const useRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const {providerId} = useCredentials();

  const getRooms = async () => {
    setLoading(true);
    const roomQuery = query(
      collection(db, "rooms"),
      where("members", "array-contains", providerId)
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
  }, [providerId]);

  return { rooms, isLoading };
};

export default useRooms;

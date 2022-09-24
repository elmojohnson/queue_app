import { useEffect, useState } from "react";
import {useRouter} from "next/router"

import { db } from "../../utils/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";

const useMembers = () => {
    const router = useRouter();
  const [members, setMembers] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const getMembers = async () => {
    setLoading(true);

    const memQuery = query(
      collection(db, "rooms", router?.query?.id, "members")
    );

    onSnapshot(memQuery, (qs) => {
      let arr = [];

      qs.forEach((doc) => {
        arr.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setMembers(arr);
    });

    setLoading(false);
  };

  useEffect(() => {
    router.isReady && getMembers();
  }, [])

  return { members, isLoading };
};

export default useMembers;

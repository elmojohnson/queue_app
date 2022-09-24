import { useEffect, useState } from "react";
import {useRouter} from "next/router"

import { db } from "../../utils/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

const useTracks = () => {
    const router = useRouter();
  const [tracks, setTracks] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const getTracks = async () => {
    setLoading(true);

    const memQuery = query(
      collection(db, "rooms", router?.query?.id, "tracks"), orderBy("requested_at", "desc")
    );

    onSnapshot(memQuery, (qs) => {
      let arr = [];

      qs.forEach((doc) => {
        arr.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setTracks(arr);
    });

    setLoading(false);
  };

  useEffect(() => {
    router.isReady && getTracks();
  }, [router])

  return { tracks, isLoading };
};

export default useTracks;

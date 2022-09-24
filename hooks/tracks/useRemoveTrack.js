import { useState } from "react";
import {useRouter} from "next/router";

import { db } from "../../utils/firebase";
import { doc, deleteDoc } from "firebase/firestore";

const useRemoveTrack = (id) => {
  const router = useRouter();
  const [isDeleting, setDeleting] = useState(false);

  const removeTrack = async () => {
    setDeleting(true);

    try {
      await deleteDoc(doc(db, "rooms", router?.query?.id, "tracks", id));
    } catch (error) {
      console.error(error);
    } finally {
      setDeleting(false);
    }
  };

  return { removeTrack, isDeleting };
};

export default useRemoveTrack;

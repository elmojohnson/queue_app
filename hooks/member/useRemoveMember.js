import { useState } from "react";
import { useRouter } from "next/router";

import { db } from "../../utils/firebase";
import { doc, updateDoc, deleteDoc, arrayRemove } from "firebase/firestore";

const useRemoveMember = (user) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const deleteUser = async () => {
    setLoading(true);

    try {
      const roomRef = doc(db, "rooms", router?.query?.id);

      // Update array
      await updateDoc(roomRef, {
        members: arrayRemove(user.spotifyId),
      });

      // Delete from sub-collection
      await deleteDoc(
        doc(db, "rooms", router?.query?.id, "members", user.id)
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { isLoading, deleteUser };
};

export default useRemoveMember;

import { useState } from "react";
import { useRouter } from "next/router";

import { db } from "../../utils/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { useToast } from "@chakra-ui/react";

const useDeleteRoom = () => {
  const router = useRouter();
  const [isDeleting, setDeleting] = useState(false);
  const toast = useToast();

  const deleteRoom = async () => {
    setDeleting(true);
    try {
      await deleteDoc(doc(db, "rooms", router?.query?.id));
    } catch (error) {
      toast({
        title: "There was a problem deleting the room",
        status: "error",
      });
    } finally {
      setDeleting(false);
      toast({
        title: "Room deleted!",
        status: "info",
      });
      router.push("/");
    }
  };

  return { deleteRoom, isDeleting };
};

export default useDeleteRoom;

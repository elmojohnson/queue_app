import { db } from "../../utils/firebase";
import { doc, getDoc } from "firebase/firestore";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const useCheckIsHost = (current_user_id) => {
  const router = useRouter();
  const [isHost, setIsHost] = useState(false);

  const getHost = async () => {
    const roomRef = doc(db, "rooms", id);
    const docSnap = await getDoc(roomRef);

    if (docSnap.exists()) {
    } else {
      console.log("Not exist");
    }
  };

  useEffect(() => {});
};

export default useCheckIsHost;

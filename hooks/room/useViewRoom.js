import { db } from "../../utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const useViewRoom = () => {
  const router = useRouter();
  const [room, setRoom] = useState({
    name: "",
    host: {
      email: "",
      id: "",
      image: "",
      name: "",
    },
    members: [],
    created_at: "",
  });
  const [isLoading, setLoading] = useState(false);

  const getRoom = async () => {
    setLoading(true);

    const roomRef = doc(db, "rooms", router.query.id);
    const docSnap = await getDoc(roomRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      setRoom({
        name: data.name,
        host: {
          email: data.host.email,
          id: data.host.id,
          image: data.host.image,
          name: data.host.name,
        },
        members: data.members,
        created_at: data.created_at,
      });
      console.log(data)
    } else {
      router.push("/");
    }

    setLoading(false);
  };

  useEffect(() => {
    router.isReady && getRoom();
  }, [router]);

  return { room, isLoading };
};

export default useViewRoom;

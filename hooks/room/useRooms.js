import { useState } from "react";
import { db } from "../../utils/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useCredentials } from "../user/useCredentials";

export const useRooms = async () => {
  let rooms;
  const credentials = await useCredentials();

  const roomQuery = query(
    collection(db, "rooms"),
    where("members", "array-contains", credentials.providerAccountId)
  );
  const roomSnapshot = await getDocs(roomQuery);

  let arr = [];

  roomSnapshot.forEach((doc) => {
    arr.push({ id: doc.id, ...doc.data() });
  });

  rooms = arr;

  return rooms;
};

import { db } from "../../utils/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import {getSession} from "next-auth/react"

export const useCredentials = async () => {
  const session = await getSession()

  let response;
  let user;

  // Query User
  const userQuery = query(collection(db, "users"), where("email", "==", session.user.email));
  const userSnapshot = await getDocs(userQuery);

  userSnapshot.forEach((doc) => {
    user = { id: doc.id, ...doc.data() };
  });

  // Query Account
  const accountQuery = query(
    collection(db, "accounts"),
    where("userId", "==", user.id)
  );
  const accountSnapshot = await getDocs(accountQuery);

  accountSnapshot.forEach((doc) => {
    response = { id: doc.id, ...doc.data() };
  });

  // Object response:
  // access_token
  // providerAccountId
  // refresh_token

  return response;
};

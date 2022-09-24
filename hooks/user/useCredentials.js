import { db } from "../../utils/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

const useCredentials = () => {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [providerId, setProviderId] = useState("");

  const getCredentials = async () => {
    const session = await getSession();

    let response;
    let user;

    // Query User
    const userQuery = query(
      collection(db, "users"),
      where("email", "==", session.user.email)
    );
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

    setAccessToken(response.access_token);
    setRefreshToken(response.refresh_token);
    setProviderId(response.providerAccountId);
  };

  useEffect(() => {
    getCredentials();
  }, [])

  // Object response:
  // access_token
  // providerAccountId
  // refresh_token

  return { accessToken, refreshToken, providerId };
};

export default useCredentials;

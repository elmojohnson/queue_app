import { db } from "../../utils/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export const useSearchUser = async (email) => {
  let user;
  let account;
  let isFound = false;

  // Query User
  const userQuery = query(collection(db, "users"), where("email", "==", email));
  const userSnapshot = await getDocs(userQuery);

  let count = 0;

  userSnapshot.forEach((doc) => {
    user = { id: doc.id, ...doc.data() };
    count++;
  });

  if (count !== 0) {
    isFound = true;
    // Query Account
    const accountQuery = query(
      collection(db, "accounts"),
      where("userId", "==", user.id)
    );
    const accountSnapshot = await getDocs(accountQuery);

    accountSnapshot.forEach((doc) => {
      account = { id: doc.id, ...doc.data() };
    });
  }

  return { user, account, isFound };
};

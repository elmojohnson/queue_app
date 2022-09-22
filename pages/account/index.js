import { useEffect } from "react";
import Layout from "../../layouts/Layout";
import {useSession} from "next-auth/react"

const Account = () => {
  const {data: session} = useSession();

  useEffect(() => {
    console.log(session)
  }, [session]);

  return <Layout>Account</Layout>;
};

export default Account;

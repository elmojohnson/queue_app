import { useEffect } from "react";
import { useCredentials } from "../../hooks/user/useCredentials";
import Layout from "../../layouts/Layout";

const Account = () => {

  const getCred = async () => {
    const credentials = await useCredentials();
    
    console.log(credentials)
  };

  useEffect(() => {
    getCred();
  }, []);

  return <Layout>Account</Layout>;
};

export default Account;

import { useEffect } from "react";
import Layout from "../../layouts/Layout";
import useCredentials from "../../hooks/user/useCredentials";

const Account = () => {
  const { accessToken } = useCredentials();

  useEffect(() => {
    console.log(accessToken);
  }, [accessToken]);

  return <Layout>Account</Layout>;
};

export default Account;

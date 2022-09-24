import { useEffect } from "react";
import Layout from "../../layouts/Layout";
import useCredentials from "../../hooks/user/useCredentials";

const Account = () => {
  const { refreshToken } = useCredentials();

  useEffect(() => {
    console.log(refreshToken);
  }, [refreshToken]);

  return <Layout>Account</Layout>;
};

export default Account;

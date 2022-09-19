import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { Container, Flex } from "@chakra-ui/react";
import Navbar from "./Navbar";
import { useEffect } from "react";

const Layout = ({ children }) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/account/login");
    }
  }, [status])

  return (
    <Flex w="full" flexDir="column">
      <Navbar />
      <Container maxW="container.sm">{children}</Container>
    </Flex>
  );
};

export default Layout;

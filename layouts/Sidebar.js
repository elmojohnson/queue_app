import { Box, Container, Text, VStack, Icon, HStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { MdHome, MdAdd, MdAccountCircle } from "react-icons/md";

const Sidebar = () => {
  const mainRoutes = [
    {
      label: "Home",
      href: "/",
      icon: <Icon as={MdHome} />,
    },
    {
      label: "Create",
      href: "/rooms/create",
      icon: <Icon as={MdAdd} />,
    },
    {
      label: "Account",
      href: "/account",
      icon: <Icon as={MdAccountCircle} />,
    },
  ];

  return (
    <Box minW="250" bg="white" h="100vh" py={4} shadow="md">
      <Container maxW="container.xl">
        <VStack spacing={4} alignItems="start">
          <Text fontSize={20} fontWeight="bold">
            Queue App
          </Text>
          <VStack alignItems="start" spacing={2}>
            {mainRoutes.map((route, i) => {
              return (
                <MainRouteItem
                  key={i}
                  label={route.label}
                  icon={route.icon}
                  href={route.href}
                />
              );
            })}
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

const MainRouteItem = ({ label, icon, href }) => {
  const router = useRouter();
  return (
    <Box
      fontSize={16}
      color={router.pathname === href ? "teal" : "gray.400"}
      onClick={() => router.push(href)}
      _hover={{cursor: "pointer", color: "black"}}
    >
      <HStack spacing={4}>
        {icon}
        <Text>{label}</Text>
      </HStack>
    </Box>
  );
};

export default Sidebar;

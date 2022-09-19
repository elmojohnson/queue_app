import { Box, Container, HStack, Text } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Box bg="teal" py={4} shadow="md">
      <Container maxW="container.xl" color="white">
        <HStack>
          <Text fontSize={20} fontWeight="bold">
            App Title
          </Text>
        </HStack>
      </Container>
    </Box>
  );
};

export default Navbar;

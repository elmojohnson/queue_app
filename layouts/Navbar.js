import {
  Box,
  Container,
  Hide,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

const Navbar = ({ title, btnRef, onOpen }) => {
  return (
    <Box bg="teal" py={4} shadow="md">
      <Container maxW="container.xl" color="white">
        <HStack>
          <Hide above="md">
            <IconButton
              ref={btnRef}
              onClick={onOpen}
              color="inherit"
              colorScheme="teal"
              size="sm"
              variant="solid"
              aria-label="Open Drawer"
              icon={<HamburgerIcon />}
            />
          </Hide>
          <Text fontSize={20} fontWeight="bold">
            {title}
          </Text>
        </HStack>
      </Container>
    </Box>
  );
};

export default Navbar;

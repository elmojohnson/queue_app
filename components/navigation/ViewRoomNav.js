import { useRouter } from "next/router";
import { useContext, useRef } from "react";
import RoomContext from "../../contexts/RoomContext";

// UI Components
import {
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { HiDotsVertical } from "react-icons/hi";
import { MdArrowBack } from "react-icons/md";
import MembersDrawer from "../drawers/MembersDrawer";

const ViewRoomNav = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const roomContext = useContext(RoomContext);

  return (
    <>
      <Box py={3} bg="white" borderBottomWidth="1px">
        <Flex>
          <HStack>
            <IconButton
              icon={<Icon as={MdArrowBack} />}
              onClick={() => router.back()}
              variant="ghost"
            />
            <Text fontWeight="bold" fontSize={20}>
              {roomContext.name}
            </Text>
          </HStack>
          <Spacer />
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<Icon as={HiDotsVertical} />}
              variant="ghost"
            />
            <MenuList>
              <MenuItem ref={btnRef} onClick={onOpen}>
                Members
              </MenuItem>
              <MenuItem>Info</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Box>

      <MembersDrawer isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
    </>
  );
};

export default ViewRoomNav;

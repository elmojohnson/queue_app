import { useRouter } from "next/router";
import { useContext, useRef } from "react";
import RoomContext from "../../contexts/RoomContext";

// UI Components
import {
  Box,
  Button,
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
import { MdArrowBack, MdMusicNote } from "react-icons/md";

// Components
import MembersDrawer from "../drawers/MembersDrawer";
import SearchTrackModal from "../modals/SearchTrackModal";

const ViewRoomNav = () => {
  const roomContext = useContext(RoomContext);
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: modalIsOpen, onOpen: modalOnOpen, onClose: modalOnClose } = useDisclosure();

  const btnRef = useRef();

  return (
    <>
      <Box py={3} bg="white" borderBottomWidth="1px">
        <Flex alignItems="center">
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
          <Button
            size="sm"
            colorScheme="green"
            leftIcon={<Icon as={MdMusicNote} />}
            onClick={modalOnOpen}
          >
            Request
          </Button>
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
      <SearchTrackModal modalIsOpen={modalIsOpen} modalOnClose={modalOnClose} />
    </>
  );
};

export default ViewRoomNav;

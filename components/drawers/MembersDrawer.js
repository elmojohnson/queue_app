import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import AddMemberModal from "../modals/AddMemberModal";

const MembersDrawer = ({ isOpen, onClose, btnRef }) => {
  const {
    isOpen: modalIsOpen,
    onOpen: modalOnOpen,
    onClose: modalOnClose,
  } = useDisclosure();
  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Members</DrawerHeader>

          <DrawerBody>asd</DrawerBody>

          <DrawerFooter>
            <Button colorScheme="green" onClick={modalOnOpen}>Add</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <AddMemberModal isOpen={modalIsOpen} onClose={modalOnClose} />
    </>
  );
};

export default MembersDrawer;

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
} from "@chakra-ui/react";

const MembersDrawer = ({isOpen, onClose, btnRef}) => {
  return (
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

        <DrawerBody>
          <Button colorScheme="green" width="full">Add</Button>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MembersDrawer;

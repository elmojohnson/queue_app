import { useContext } from "react";
import { useSession } from "next-auth/react";
import RoomContext from "../../contexts/RoomContext";
import useMembers from "../../hooks/member/useMembers";

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
  VStack,
} from "@chakra-ui/react";

import AddMemberModal from "../modals/AddMemberModal";
import LoadingScreen from "../utils/LoadingScreen";
import MemberItem from "../items/MemberItem";

const MembersDrawer = ({ isOpen, onClose, btnRef }) => {
  const roomContext = useContext(RoomContext);
  const { data: session } = useSession();
  const { members, isLoading } = useMembers();
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
        size="lg"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Members</DrawerHeader>

          <DrawerBody>
            {isLoading ? (
              <LoadingScreen />
            ) : (
              <VStack spacing={4}>
                {members.map((member) => {
                  return <MemberItem key={member.id} user={member} />;
                })}
              </VStack>
            )}
          </DrawerBody>

          <DrawerFooter>
            {roomContext.host.email === session?.user?.email && (
              <Button colorScheme="green" onClick={modalOnOpen}>
                Add
              </Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <AddMemberModal isOpen={modalIsOpen} onClose={modalOnClose} />
    </>
  );
};

export default MembersDrawer;

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { db } from "../../utils/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";

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
  const [members, setMembers] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const router = useRouter();
  const {
    isOpen: modalIsOpen,
    onOpen: modalOnOpen,
    onClose: modalOnClose,
  } = useDisclosure();

  const getMembers = async () => {
    const memQuery = query(
      collection(db, "rooms", router?.query.id, "members")
    );

    onSnapshot(memQuery, (qs) => {
      let arr = [];

      qs.forEach((doc) => {
        arr.push({
          member_id: doc.id,
          spotify_id: doc.data().id,
          ...doc.data(),
        });
      });

      console.log(arr);
      setMembers(arr);
    });
  };

  useEffect(() => {
    router.isReady && getMembers();
  }, []);

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
                  return <MemberItem user={member} />;
                })}
              </VStack>
            )}
          </DrawerBody>

          <DrawerFooter>
            <Button colorScheme="green" onClick={modalOnOpen}>
              Add
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <AddMemberModal isOpen={modalIsOpen} onClose={modalOnClose} />
    </>
  );
};

export default MembersDrawer;

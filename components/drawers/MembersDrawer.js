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
import useMembers from "../../hooks/member/useMembers";

const MembersDrawer = ({ isOpen, onClose, btnRef }) => {
  const {members, isLoading} = useMembers();

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
                  return <MemberItem key={member.member_id} user={member} />;
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

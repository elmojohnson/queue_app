// UI Components
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
  HStack,
} from "@chakra-ui/react";

// Formik
import { Formik } from "formik";
import * as Yup from "yup";
import { useSearchUser } from "../../hooks/user/useSearchUser";
import { useState } from "react";
import UserResultItem from "../items/UserResultItem";

// FUNC
const AddMemberModal = ({ isOpen, onClose }) => {
  const toast = useToast();
  const [user, setUser] = useState({
    id: "",
    email: "",
    name: "",
    image: "",
    spotifyId: "",
  });
  const [isFound, setFound] = useState(false);

  // Form validation
  const ValidationSchema = Yup.object().shape({
    name: Yup.string().required("Please enter name"),
  });

  // Create room
  const SearchUser = async (name) => {
    const { user, account, isFound: isUserFound } = await useSearchUser(name);
    try {
      if (isUserFound) {
        setFound(true);
        const result = {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          spotifyId: account.providerAccountId,
        };
        setUser(result);
      } else {
        toast({
          title: "User not found!",
          status: "error",
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <Formik
        validationSchema={ValidationSchema}
        initialValues={{
          name: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          SearchUser(values.name);
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleSubmit,
        }) => (
          <ModalContent>
            <ModalHeader>Search a user</ModalHeader>
            <ModalCloseButton disabled={isSubmitting} />

            <ModalBody pb={4}>
              <HStack alignItems="start" mb={4}>
                <FormControl isRequired isInvalid={errors.name}>
                  <Input
                    type="text"
                    placeholder="Enter name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  {errors.name && touched.name ? (
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                  ) : null}
                </FormControl>
                <Button
                  colorScheme="green"
                  type="submit"
                  onClick={handleSubmit}
                  isLoading={isSubmitting}
                  loadingText="Searching"
                >
                  Search
                </Button>
              </HStack>

              {isFound && <UserResultItem user={user} />}
            </ModalBody>
          </ModalContent>
        )}
      </Formik>
    </Modal>
  );
};

export default AddMemberModal;

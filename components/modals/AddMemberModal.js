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
    email: Yup.string().email().required("Please enter user's email"),
  });

  // Create room
  const SearchUser = async (email) => {
    const { user, account, isFound: isUserFound } = await useSearchUser(email);
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
          email: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          SearchUser(values.email);
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
            <ModalHeader>Add a new member</ModalHeader>
            <ModalCloseButton disabled={isSubmitting} />

            <ModalBody pb={4}>
              <HStack alignItems="start" mb={4}>
                <FormControl isRequired isInvalid={errors.email}>
                  <Input
                    type="email"
                    placeholder="Enter user's email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  {errors.email && touched.email ? (
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
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

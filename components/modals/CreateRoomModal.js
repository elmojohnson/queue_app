// NextAuth
import { useSession } from "next-auth/react";

// UI Components
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";

// Formik
import { Formik } from "formik";
import * as Yup from "yup";

// Hooks
import { useCreateRoom } from "../../hooks/room/useCreateRoom";
import { useCredentials } from "../../hooks/user/useCredentials";

// FUNC
const CreateRoomModal = ({ isOpen, onClose }) => {
  const toast = useToast();
  const { data: session } = useSession();

  // Form validation
  const ValidationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Name is too short")
      .required("Name is required to create a room."),
  });

  // Create room
  const createRoom = async (name) => {
    const credentials = await useCredentials();
    const newRoom = useCreateRoom(
      name,
      session?.user,
      credentials.providerAccountId
    );
    newRoom
      .then((res) => {
        toast(res);
        onClose();
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "There was a problem creating the room. Try again!",
          status: "error",
          isClosable: true,
        });
      });
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
          createRoom(values.name);
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
            <ModalHeader>Create a room</ModalHeader>
            <ModalCloseButton disabled={isSubmitting} />

            <ModalBody>
              <FormControl isRequired isInvalid={errors.name}>
                <FormLabel>Room name</FormLabel>
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
            </ModalBody>

            <ModalFooter gap={2}>
              <Button onClick={onClose} disabled={isSubmitting}>
                Close
              </Button>
              <Button
                colorScheme="green"
                type="submit"
                onClick={handleSubmit}
                isLoading={isSubmitting}
                loadingText="Creating"
              >
                Create
              </Button>
            </ModalFooter>
          </ModalContent>
        )}
      </Formik>
    </Modal>
  );
};

export default CreateRoomModal;

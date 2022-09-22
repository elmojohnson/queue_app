// Chakra UI
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";

// Layout
import Layout from "../../layouts/Layout";

// Formik
import { Formik } from "formik";
import * as Yup from "yup";

// NextAuth
import { useSession } from "next-auth/react";

// Firebase
import { db } from "../../utils/firebase";
import {
  doc,
  addDoc,
  setDoc,
  Timestamp,
  collection,
} from "firebase/firestore";
import { useEffect } from "react";

const Create = () => {
  const toast = useToast();
  const { data: session } = useSession();

  const ValidationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Name is too short")
      .required("Name is required to create a room."),
  });

  const createRoom = async (name) => {
    try {
      const roomRef = doc(collection(db, "rooms"));
      const memberRef = collection(roomRef, "members");

      await setDoc(roomRef, {
        name,
        host: {
          id: session?.user?.id,
          name: session?.user?.name,
          email: session?.user?.email,
          image: session?.user?.image,
        },
        members: [session?.user?.id],
        created_at: Timestamp.now(),
      });

      await addDoc(memberRef, {
        id: session?.user?.id,
        name: session?.user?.name,
        email: session?.user?.email,
        image: session?.user?.image,
        isHost: true,
        joined_at: Timestamp.now(),
      });

      setTimeout(() => {
        toast({
          title: "Account Created!",
          status: "success",
          isClosable: true,
        });
      }, 1000);

      router.push("/rooms");
    } catch (error) {
      console.log(error)
      toast({
        title: "There was a problem creating the room. Try again!",
        status: "error",
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    console.log(session)
  }, [])

  return (
    <Layout>
      <Stack spacing={4} py={3}>
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
            <>
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
              <Button
                w="fit-content"
                alignSelf="end"
                colorScheme="green"
                type="submit"
                onClick={handleSubmit}
                isLoading={isSubmitting}
                loadingText="Creating"
              >
                Create
              </Button>
            </>
          )}
        </Formik>
      </Stack>
    </Layout>
  );
};

export default Create;

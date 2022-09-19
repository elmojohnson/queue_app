import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";

import Layout from "../../layouts/Layout";

import { Formik } from "formik";
import * as Yup from "yup";

const Create = () => {
  const toast = useToast();

  const ValidationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Name is too short")
      .required("Name is required to create a room."),
  });

  return (
    <Layout>
      <Stack spacing={4} py={3}>
        <Formik
          validationSchema={ValidationSchema}
          initialValues={{
            name: "",
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              console.log(values);
              setSubmitting(false);
              toast({
                title: "Account Created!",
                status: "success",
                isClosable: true
              })
            }, 2000);
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

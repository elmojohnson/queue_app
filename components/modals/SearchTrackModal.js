import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  HStack,
  FormControl,
  Input,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";

import { Formik } from "formik";
import * as Yup from "yup";
import useCredentials from "../../hooks/user/useCredentials";

const SearchTrackModal = ({ modalIsOpen, modalOnClose }) => {
  const { accessToken } = useCredentials();
  const SearchSchema = Yup.object().shape({
    searchInput: Yup.string().required("This field is required!"),
  });

  const searchTrack = (search) => {
    console.log(search, accessToken);
  };

  return (
    <Modal isOpen={modalIsOpen} onClose={modalOnClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Search track</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{
              searchInput: "",
            }}
            validationSchema={SearchSchema}
            onSubmit={(values, { setSubmitting }) => {
              searchTrack(values.searchInput);
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
              <HStack alignItems="start">
                <FormControl isInvalid={errors.searchInput}>
                  <Input
                    placeholder="Search a track"
                    name="searchInput"
                    value={values.searchInput}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  {errors.searchInput && touched.searchInput ? (
                    <FormErrorMessage>{errors.searchInput}</FormErrorMessage>
                  ) : null}
                </FormControl>
                <Button
                  colorScheme="green"
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  loadingText="Searching"
                  isLoading={isSubmitting}
                >
                  Search
                </Button>
              </HStack>
            )}
          </Formik>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SearchTrackModal;

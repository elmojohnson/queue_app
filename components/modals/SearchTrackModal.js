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
  Box,
  VStack,
} from "@chakra-ui/react";

import LoadingScreen from "../utils/LoadingScreen";

import { Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useAccessToken } from "../../hooks/user/useAccessToken";
import useCredentials from "../../hooks/user/useCredentials";
import { spotify } from "../../utils/spotify";
import SearchTrackItem from "../items/SearchTrackItem";

const SearchTrackModal = ({ modalIsOpen, modalOnClose }) => {
  const [tracks, setTracks] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const { refreshToken } = useCredentials();
  const SearchSchema = Yup.object().shape({
    searchInput: Yup.string().required("This field is required!"),
  });

  const SearchTrack = async (search) => {
    setLoading(true);
    const accessToken = await useAccessToken(refreshToken);
    spotify.setAccessToken(accessToken);

    const result = await spotify.searchTracks(search);
    setTracks(result.tracks.items);

    setLoading(false);
  };

  return (
    <Modal isOpen={modalIsOpen} onClose={modalOnClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Request</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{
              searchInput: "",
            }}
            validationSchema={SearchSchema}
            onSubmit={(values, { setSubmitting }) => {
              SearchTrack(values.searchInput);
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
          <Box>
            {isLoading ? (
              <LoadingScreen />
            ) : (
              <VStack alignItems="start" spacing={3} py={3}>
                {tracks.map((track) => {
                  return (
                    <SearchTrackItem
                      key={track.id}
                      uri={track.uri}
                      name={track.name}
                      artists={track.artists.map((a) => a.name).join(", ")}
                      image={track.album.images[2].url}
                    />
                  );
                })}
              </VStack>
            )}
          </Box>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SearchTrackModal;

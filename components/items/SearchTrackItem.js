import {
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Image,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";

import { MdAdd, MdCheck } from "react-icons/md";
import useRequestTrack from "../../hooks/tracks/useRequestTrack";

const SearchTrackItem = ({ uri, name, artists, image }) => {
  const { requestTrack, isAdding, isAdded } = useRequestTrack(
    uri,
    name,
    artists,
    image
  );
  return (
    <Box w="full">
      <HStack spacing={2}>
        <Image src={image} alt={name} />
        <VStack alignItems="start" spacing={0} w="full">
          <Text fontWeight="semibold">{name}</Text>
          <Text fontSize={12}>{artists}</Text>
        </VStack>
        <Spacer />
        <IconButton
          colorScheme="green"
          variant="ghost"
          icon={isAdded ? <Icon as={MdCheck} /> : <Icon as={MdAdd} />}
          onClick={requestTrack}
          isLoading={isAdding}
          isDisabled={isAdding || isAdded}
        />
      </HStack>
    </Box>
  );
};

export default SearchTrackItem;

import {
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Image,
  Spacer,
  Text,
  Tooltip,
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
          <Text fontWeight="semibold" color="purple.500">
            {name}
          </Text>
          <Text fontSize={12}>{artists}</Text>
        </VStack>
        <Spacer />
        <Tooltip label="Request track">
          <IconButton
            colorScheme="green"
            variant="ghost"
            icon={isAdded ? <Icon as={MdCheck} /> : <Icon as={MdAdd} />}
            onClick={requestTrack}
            isLoading={isAdding}
            isDisabled={isAdding || isAdded}
          />
        </Tooltip>
      </HStack>
    </Box>
  );
};

export default SearchTrackItem;

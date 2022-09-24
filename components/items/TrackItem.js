import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Icon,
  IconButton,
  Image,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";

import { MdAdd, MdCheck, MdDelete } from "react-icons/md";
import moment from "moment";
import useAddToQueue from "../../hooks/tracks/useAddToQueue";

const TrackItem = ({ id, uri, name, artists, image, user, date, isQueued }) => {
  const { addToQueue, isQueueing } = useAddToQueue(id, uri);
  return (
    <Box w="full">
      <HStack spacing={2}>
        <Image src={image} alt={name} />
        <VStack alignItems="start" spacing={0}>
          <Text fontWeight="bold" color="teal">
            {name}
          </Text>
          <Text fontSize={14}>{artists}</Text>
          <Text fontSize={12} color="gray.400">
            Requested by: {user.name} {moment(date.toDate()).fromNow()}
          </Text>
        </VStack>
        <Spacer />
        <ButtonGroup size="sm">
          <Button
            leftIcon={isQueued ? <Icon as={MdCheck} /> : <Icon as={MdAdd} />}
            disabled={isQueued}
            isLoading={isQueueing}
            loadingText="Queueing"
            onClick={addToQueue}
          >
            {isQueued ? "Queued" : "Queue"}
          </Button>
          <IconButton icon={<Icon as={MdDelete} />} />
        </ButtonGroup>
      </HStack>
    </Box>
  );
};

export default TrackItem;

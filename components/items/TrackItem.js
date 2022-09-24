import { useContext } from "react";
import { useSession } from "next-auth/react";
import RoomContext from "../../contexts/RoomContext";
import useAddToQueue from "../../hooks/tracks/useAddToQueue";
import useRemoveTrack from "../../hooks/tracks/useRemoveTrack";

import moment from "moment";

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
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { MdCheck, MdOutlineQueue, MdRemove } from "react-icons/md";

const TrackItem = ({ id, uri, name, artists, image, user, date, isQueued }) => {
  const room = useContext(RoomContext);
  const { data: session } = useSession();
  const { addToQueue, isQueueing } = useAddToQueue(id, uri);
  const { removeTrack, isDeleting } = useRemoveTrack(id);

  return (
    <Box w="full">
      <HStack spacing={2}>
        <Image src={image} alt={name} />
        <VStack alignItems="start" spacing={0}>
          <Text fontWeight="bold" color="purple.500">
            {name}
          </Text>
          <Text fontSize={14}>{artists}</Text>
          <Text fontSize={12} color="gray.400">
            Requested by: {user.name} {moment(date.toDate()).fromNow()}
          </Text>
        </VStack>
        <Spacer />
        {session?.user?.email === room.host.email && (
          <ButtonGroup size="xs">
            <Button
              colorScheme="green"
              leftIcon={
                isQueued ? <Icon as={MdCheck} /> : <Icon as={MdOutlineQueue} />
              }
              disabled={isQueued}
              isLoading={isQueueing}
              loadingText="Queueing"
              onClick={addToQueue}
            >
              {isQueued ? "Queued" : "Queue"}
            </Button>
            <Tooltip label="Remove">
              <IconButton
                icon={<Icon as={MdRemove} />}
                onClick={removeTrack}
                isLoading={isDeleting}
                isDisabled={isDeleting}
              />
            </Tooltip>
          </ButtonGroup>
        )}

        {session?.user?.email !== room.host.email && isQueued ? (
          <HStack color="green.500" fontSize={12} fontWeight="bold">
            <Icon as={MdCheck} />
            <Text>Queued</Text>
          </HStack>
        ) : null}
      </HStack>
    </Box>
  );
};

export default TrackItem;

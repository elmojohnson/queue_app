import { useRouter } from "next/router";
import { Box, Text, VStack, HStack, Spacer, Button } from "@chakra-ui/react";

const RoomItem = ({ id, name, host }) => {
  const router = useRouter();

  const viewRoom = () => {
    router.push(`/room/${id}`)
  };
  return (
    <Box p={4} bg="white" borderWidth="1px" borderRadius="md">
      <VStack w="full" align="stretch" spacing={0}>
        <Text fontSize={20} fontWeight="bold" color="teal" noOfLines={1}>
          {name}
        </Text>
        <HStack>
          <Text>{host.name}</Text>
          <Spacer />
          <Button size="sm" onClick={viewRoom}>
            View
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default RoomItem;

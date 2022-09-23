import { createContext } from "react";

const RoomContext = createContext({
  name: "",
  host: {
    email: "",
    id: "",
    image: "",
    name: "",
  },
  members: [],
  created_at: "",
});

export default RoomContext;
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
  isAutoQueue: false,
  created_at: "",
});

export default RoomContext;

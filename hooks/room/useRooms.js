import { useState } from "react";

export const useRooms = () => {
    const [rooms, setRooms] = useState([
        {
          name: "Room 1",
          host: "Host 1",
        },
        {
          name: "Room 2",
          host: "Host 2",
        },
        {
          name: "Room 3",
          host: "Host 3",
        },
        {
          name: "Room 4",
          host: "Host 4",
        },
        {
          name: "Room 5",
          host: "Host 5",
        },
        {
          name: "Room 5",
          host: "Host 5",
        },
        {
          name: "Room 5",
          host: "Host 5",
        },
        {
          name: "Room 5",
          host: "Host 5",
        },
        {
          name: "Room 5",
          host: "Host 5",
        },
      ]);

    return rooms;
}
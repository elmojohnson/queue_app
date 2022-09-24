import axios from "axios";
import useCredentials from "../hooks/user/useCredentials";
const accessToken =
  "BQDNS9xO4y2dL183ByAOHnvfaEnbmp1QtiUg3ibjNpRwzii5ECXMpBLqosYBD-RitPY4Qz3O7EaI5xolpWA2w8WfSgcrzkzB06eNp-BGhRZHzvkP72U_AKfJirFnf1zuB_rWEyd6iqxm9mvaRzKt1-IBuLZ-dxsCJ4dSftfWxh5XsKJHHohB6LXpelrvc0G9qCjhD07zuZDMvw";
const client = axios.create({
  baseURL: "https://api.spotify.com/v1",
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

export default client;

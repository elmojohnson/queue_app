import axios from "axios";
import { useCredentials } from "../hooks/user/useCredentials";

const credentials = useCredentials();
const instance = axios.create({
    baseURL: "https://api.spotify.com/v1",
    headers: {
        Authorization: `Bearer ${credentials}`
    }
})
import { useEffect, useState } from "react";
import { useCredentials } from "./useCredentials";

const useSpotifyToken = () => {
  const [accessToken, setAccessToken] = useState("");

  const getTokens = async () => {
    const credentials = await useCredentials();
    setAccessToken(credentials);
  };

  useEffect(() => {
    getTokens();
  }, [accessToken]);

  return accessToken;
};

export default useSpotifyToken;

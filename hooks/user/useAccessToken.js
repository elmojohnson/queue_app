import axios from "axios";

export const useAccessToken = async (refresh_token) => {
  let accessToken;

  const result = await axios.post("/api/spotify/access_token", {
    refresh_token: refresh_token,
  });
  accessToken = result.data.accessToken;
  
  return accessToken;
};

import { spotify } from "../../utils/spotify";
import { useAccessToken } from "../user/useAccessToken";
import useCredentials from "../user/useCredentials";

const useShowSpotifyAccount = () => {
  const { refreshToken } = useCredentials();

  const showProfile = async () => {
    try {
        const accessToken = await useAccessToken(refreshToken);
        spotify.setAccessToken(accessToken);
        const profile = await spotify.getMe();

        if(window !== undefined) {
            window.open(profile.external_urls.spotify, "_blank").focus()
        }

    } catch (error) {
        console.error(error)
    }
  }

  return showProfile;
};

export default useShowSpotifyAccount;

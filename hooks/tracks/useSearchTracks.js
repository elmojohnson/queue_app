import { useEffect, useState } from "react";
import { useAccessToken } from "../user/useAccessToken";
import useCredentials from "../user/useCredentials";
import { spotify } from "../../utils/spotify";

export const useSearchTracks = async (query) => {
  let searchResult;
  const { refreshToken } = useCredentials();

  const accessToken = await useAccessToken(refreshToken);
  spotify.setAccessToken(accessToken);

  const result = await spotify.searchTracks(query);
  searchResult = result.tracks.items;

  return searchResult;
};

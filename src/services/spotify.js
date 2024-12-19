import axios from "axios";
import * as utils from "../utils";

const baseUrl = "https://api.spotify.com/v1";

let tokenInfo = {
  access_token: null,
  token_type: null,
  expires_in: 0,
};

const setTokenInfo = (newTokenInfo) => {
  tokenInfo = newTokenInfo;
};

const getUserProfile = async () => {
  const config = {
    headers: {
      Authorization: `${tokenInfo.token_type} ${tokenInfo.access_token}`,
    },
  };

  const response = await axios.get(`${baseUrl}/me`, config);
  return response.data;
};

const getUserTopTracks = async (time_range, limit, offset = 0) => {
  const config = {
    headers: {
      Authorization: `${tokenInfo.token_type} ${tokenInfo.access_token}`,
    },
  };

  const params = utils.encodeQueryParams({ time_range, limit, offset });

  const response = await axios.get(
    `${baseUrl}/me/top/tracks?${params}`,
    config
  );
  return response.data;
};

const getUserPlaylists = async (limit, offset = 0) => {
  const config = {
    headers: {
      Authorization: `${tokenInfo.token_type} ${tokenInfo.access_token}`,
    },
  };

  const params = utils.encodeQueryParams({ limit, offset });

  const response = await axios.get(`${baseUrl}/me/playlists?${params}`, config);
  return response.data;
};

const getPlaylistInfo = async (playlistUri) => {
  const config = {
    headers: {
      Authorization: `${tokenInfo.token_type} ${tokenInfo.access_token}`,
    },
  };

  const response = await axios.get(
    `${baseUrl}/playlists/${playlistUri}`,
    config
  );
  return response.data;
};

const getPlaylistTracks = async (playlistUri, limit, offset) => {
  const config = {
    headers: {
      Authorization: `${tokenInfo.token_type} ${tokenInfo.access_token}`,
    },
  };

  const params = utils.encodeQueryParams({ limit, offset });

  const response = await axios.get(
    `${baseUrl}/playlists/${playlistUri}/tracks?${params}`,
    config
  );
  return response.data;
};

const reorderPlaylistItem = async (trackItemInfo) => {
  const config = {
    headers: {
      Authorization: `${tokenInfo.token_type} ${tokenInfo.access_token}`,
    },
  };

  const response = await axios.put(
    `${baseUrl}/playlists/${trackItemInfo.playlistUri}/tracks`,
    trackItemInfo.order,
    config
  );
  return response.data;
};

export default {
  setTokenInfo,
  getUserProfile,
  getUserTopTracks,
  getPlaylistInfo,
  getPlaylistTracks,
  reorderPlaylistItem,
  getUserPlaylists,
};

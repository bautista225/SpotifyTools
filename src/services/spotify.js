import axios from "axios";
import utils from "../utils";

const baseUrl = "https://api.spotify.com/v1";
const tokenUrl = "https://accounts.spotify.com/api/token";

let token = null;

const getToken = () => {
  return token || localStorage.getItem("token");
};

const setToken = (newToken) => {
  token = newToken;
};

const getUserToken = async (client_id, client_secret) => {
  const auth_token = window.btoa(`${client_id}:${client_secret}`);
  const data = utils.encodeQueryParams({ grant_type: "client_credentials" });

  const config = {
    headers: {
      Authorization: `Basic ${auth_token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const response = await axios.post(tokenUrl, data, config);
  return response.data;
};

const getUserProfile = async () => {
  const config = {
    headers: { Authorization: `Bearer ${getToken()}` },
  };

  const response = await axios.get(`${baseUrl}/me`, config);
  return response.data;
};

const getUserTopTracks = async (time_range, limit, offset = 0) => {
  const config = {
    headers: { Authorization: `Bearer ${getToken()}` },
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
    headers: { Authorization: `Bearer ${getToken()}` },
  };

  const params = utils.encodeQueryParams({ limit, offset });

  const response = await axios.get(`${baseUrl}/me/playlists?${params}`, config);
  return response.data;
};

const getPlaylistInfo = async (playlistUri) => {
  const config = {
    headers: { Authorization: `Bearer ${getToken()}` },
  };

  const response = await axios.get(
    `${baseUrl}/playlists/${playlistUri}`,
    config
  );
  return response.data;
};

const getPlaylistTracks = async (playlistUri, limit, offset) => {
  const config = {
    headers: { Authorization: `Bearer ${getToken()}` },
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
    headers: { Authorization: `Bearer ${getToken()}` },
  };

  const response = await axios.put(
    `${baseUrl}/playlists/${trackItemInfo.playlistUri}/tracks`,
    trackItemInfo.order,
    config
  );
  return response.data;
};

export default {
  setToken,
  getUserToken,
  getUserProfile,
  getUserTopTracks,
  getPlaylistInfo,
  getPlaylistTracks,
  reorderPlaylistItem,
  getUserPlaylists,
};

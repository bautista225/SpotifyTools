import axios from "axios";
import * as utils from "../utils";

const baseUrl = "https://api.spotify.com/v1";
const accountsTokenUrl = "https://accounts.spotify.com/api/token";
const TOKEN_EXPIRATION_ERROR = { status: 401, message: "Token expired" };

// Exchanges the authorization code returned on the redirect for an access token
// (Authorization Code with PKCE). Returns the raw token endpoint response.
const exchangeCodeForToken = async (code, codeVerifier) => {
  const body = new URLSearchParams({
    client_id: import.meta.env.VITE_CLIENT_ID,
    grant_type: "authorization_code",
    code,
    redirect_uri: utils.getRedirectUri(),
    code_verifier: codeVerifier,
  });

  const response = await axios.post(accountsTokenUrl, body, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  return response.data;
};

// Requests a fresh access token using the stored refresh token. Spotify may or
// may not return a new refresh_token; when absent the caller keeps the old one.
const refreshAccessToken = async (refreshToken) => {
  const body = new URLSearchParams({
    client_id: import.meta.env.VITE_CLIENT_ID,
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const response = await axios.post(accountsTokenUrl, body, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  return response.data;
};

let tokenInfo = {
  access_token: null,
  token_type: null,
  expires_in: 0,
  expiresAt: 0,
};

const setTokenInfo = (newTokenInfo) => {
  tokenInfo = newTokenInfo;
};

const hasTokenExpired = (margin = 10 * 60) => {
  return tokenInfo.expiresAt - margin < (Date.now() / 1000);
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

const getUserTopArtists = async (time_range, limit, offset = 0) => {
  const config = {
    headers: {
      Authorization: `${tokenInfo.token_type} ${tokenInfo.access_token}`,
    },
  };

  const params = utils.encodeQueryParams({ time_range, limit, offset });

  const response = await axios.get(
    `${baseUrl}/me/top/artists?${params}`,
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
  hasTokenExpired,
  exchangeCodeForToken,
  refreshAccessToken,
  TOKEN_EXPIRATION_ERROR,
  getUserProfile,
  getUserTopTracks,
  getUserTopArtists,
  getPlaylistInfo,
  getPlaylistTracks,
  reorderPlaylistItem,
  getUserPlaylists,
};

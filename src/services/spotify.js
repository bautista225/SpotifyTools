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

// --- Response normalization (Feb 2026 API migration) ---
// Spotify renamed the playlist track container from `tracks` to `items` and the
// per-item `track` subfield to `item`. To stay compatible with both the old and
// new shapes, the service always exposes the legacy shape to the rest of the app
// (playlist.tracks paging object, and item.track), preserving added_at untouched.

// Ensures a playlist item exposes `.track`, reading from the new `.item` field
// when present. Keeps added_at and every other field intact.
const normalizePlaylistItem = (item) => {
  if (!item) return item;
  if (item.track) return item;
  if (item.item) return { ...item, track: item.item };
  return item;
};

// Ensures a tracks paging object exposes normalized items under `.items`.
const normalizeTracksPaging = (paging) => {
  if (!paging) return paging;
  return {
    ...paging,
    items: Array.isArray(paging.items)
      ? paging.items.map(normalizePlaylistItem)
      : paging.items,
  };
};

// Normalizes a full playlist object: the paging object may arrive as `items`
// (new) instead of `tracks` (old). Always exposes it under `.tracks`.
const normalizePlaylist = (playlist) => {
  if (!playlist) return playlist;
  const tracksPaging = playlist.tracks || playlist.items;
  return { ...playlist, tracks: normalizeTracksPaging(tracksPaging) };
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
  const data = response.data;
  // Each simplified playlist may expose its track count under `items` (new) or
  // `tracks` (old); normalize so the UI can always read `.tracks.total`.
  if (Array.isArray(data.items)) {
    data.items = data.items.map(normalizePlaylist);
  }
  return data;
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
  return normalizePlaylist(response.data);
};

const getPlaylistTracks = async (playlistUri, limit, offset) => {
  const config = {
    headers: {
      Authorization: `${tokenInfo.token_type} ${tokenInfo.access_token}`,
    },
  };

  const params = utils.encodeQueryParams({ limit, offset });

  const response = await axios.get(
    `${baseUrl}/playlists/${playlistUri}/items?${params}`,
    config
  );
  return normalizeTracksPaging(response.data);
};

const reorderPlaylistItem = async (trackItemInfo) => {
  const config = {
    headers: {
      Authorization: `${tokenInfo.token_type} ${tokenInfo.access_token}`,
    },
  };

  const response = await axios.put(
    `${baseUrl}/playlists/${trackItemInfo.playlistUri}/items`,
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

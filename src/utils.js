export const encodeQueryParams = (params) =>
  Object.keys(params)
    .map(
      (param) =>
        `${encodeURIComponent(param)}=${encodeURIComponent(params[param])}`
    )
    .join("&");

const AUTHORIZATION_SCOPE = [
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-modify-private",
  "user-read-recently-played",
  "user-top-read",
  "user-read-private",
  "user-read-email",
].join(" ");

const CODE_VERIFIER_STORAGE_KEY = "SpotifyTools_code_verifier";
const AUTH_STATE_STORAGE_KEY = "SpotifyTools_auth_state";

export const getRedirectUri = () =>
  import.meta.env.DEV
    ? import.meta.env.VITE_AUTHENTICATION_REDIRECT_URI
    : "https://bautista225.github.io/SpotifyTools/authToken";

const generateRandomString = (length) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

const base64UrlEncode = (buffer) =>
  btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

const generateCodeChallenge = async (codeVerifier) => {
  const data = new TextEncoder().encode(codeVerifier);
  const hashed = await crypto.subtle.digest("SHA-256", data);
  return base64UrlEncode(hashed);
};

// Builds the Authorization Code with PKCE authorization URL. Persists the code
// verifier and state so the redirect callback can complete the token exchange.
export const buildAuthorizationUrl = async () => {
  const codeVerifier = generateRandomString(64);
  const state = generateRandomString(16);
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  window.localStorage.setItem(CODE_VERIFIER_STORAGE_KEY, codeVerifier);
  window.localStorage.setItem(AUTH_STATE_STORAGE_KEY, state);

  const params = {
    client_id: import.meta.env.VITE_CLIENT_ID,
    response_type: "code",
    redirect_uri: getRedirectUri(),
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    state,
    scope: AUTHORIZATION_SCOPE,
  };

  return `https://accounts.spotify.com/authorize?${encodeQueryParams(params)}`;
};

export const consumeStoredCodeVerifier = () => {
  const codeVerifier = window.localStorage.getItem(CODE_VERIFIER_STORAGE_KEY);
  window.localStorage.removeItem(CODE_VERIFIER_STORAGE_KEY);
  return codeVerifier;
};

export const consumeStoredAuthState = () => {
  const state = window.localStorage.getItem(AUTH_STATE_STORAGE_KEY);
  window.localStorage.removeItem(AUTH_STATE_STORAGE_KEY);
  return state;
};

const parseExpiresInToDate = (expires_in) => {
  const expiresIn = parseInt(expires_in) || 0
  if (expiresIn === 0) return 0

  const dateNowSeconds = Date.now() / 1000

  return dateNowSeconds + expiresIn
}

// Reads the authorization response returned by Spotify on the redirect. With
// the Authorization Code flow the code and state arrive as query params (?...),
// no longer in the URL hash (#...) as they did with the sunset Implicit flow.
export const getAuthorizationResponseFromQuery = () => {
  const params = new URLSearchParams(window.location.search);
  devConsoleLog(window.location);

  return {
    code: params.get("code"),
    state: params.get("state"),
    error: params.get("error"),
  };
};

// Maps a raw token endpoint response into the session shape used across the app.
export const buildSessionFromTokenResponse = (data) => ({
  access_token: data.access_token,
  token_type: data.token_type,
  expires_in: parseInt(data.expires_in) || 0,
  expiresAt: parseExpiresInToDate(data.expires_in),
  refresh_token: data.refresh_token || null,
  scope: data.scope || null,
});

export const devConsoleLog = (...args) => {
  import.meta.env.DEV && console.log(...args)
}
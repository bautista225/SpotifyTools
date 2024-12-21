export const encodeQueryParams = (params) =>
  Object.keys(params)
    .map(
      (param) =>
        `${encodeURIComponent(param)}=${encodeURIComponent(params[param])}`
    )
    .join("&");

export const getTokenAuthorizationUrl = () => {
  const params = {
    client_id: import.meta.env.VITE_CLIENT_ID,
    response_type: "token",
    redirect_uri: import.meta.env.DEV ? import.meta.env.VITE_AUTHENTICATION_REDIRECT_URI : 'https://bautista225.github.io/SpotifyTools/authToken',
    scope: `
        playlist-read-private 
        playlist-read-collaborative 
        playlist-modify-public 
        playlist-modify-private 
        user-read-recently-played 
        user-top-read
        user-read-private
        user-read-email
      `,
  };

  return `https://accounts.spotify.com/authorize?${encodeQueryParams(params)}`;
};

const parseExpiresInToDate = (expires_in) => {
  const expiresIn = parseInt(expires_in) || 0
  if (expiresIn === 0) return 0

  const dateNowSeconds = Date.now() / 1000

  return dateNowSeconds + expiresIn
}

export const getAuthorizationTokenFromHash = () => {
  console.log('aqui')
  const hash = window.location.hash;
  console.log(window.location)
  const params = new URLSearchParams(hash.slice(1)); // Remove the '#' at the beginning

  const tokenInfo = {
    access_token: params.get("access_token"),
    token_type: params.get("token_type"),
    expires_in: parseInt(params.get("expires_in")) || 0,
    expiresAt: parseExpiresInToDate(params.get("expires_in")),
  };
  return tokenInfo;
};
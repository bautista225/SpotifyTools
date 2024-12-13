const encodeQueryParams = (params) =>
  Object.keys(params)
    .map(
      (param) =>
        `${encodeURIComponent(param)}=${encodeURIComponent(params[param])}`
    )
    .join("&");

const getTokenAuthorizationUrl = () => {
  const params = {
    client_id: "d5c9087e116c42b3a90a6cf20117e1d8",
    response_type: "token",
    redirect_uri: import.meta.env.VITE_AUTHENTICATION_REDIRECT_URI,
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

const getAuthorizationTokenFromHash = () => {
  const hash = window.location.hash;
  const params = new URLSearchParams(hash.slice(1)); // Remove the '#' at the beginning
  return params.get("access_token");
};

const getTrackOldPosition = (track, oldList) => {
  const addedAtDate = track.added_at;
  const trackId = track.track.id;
  const oldPosition = oldList.findIndex(
    (t) => t.added_at === addedAtDate && t.track.id === trackId
  );

  return oldPosition;
};

const moveElementInArray = (arr, old_index, new_index) => {
  if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
          arr.push(undefined);
      }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;
};

export default {
  encodeQueryParams,
  getTokenAuthorizationUrl,
  getAuthorizationTokenFromHash,
  getTrackOldPosition,
  moveElementInArray
};

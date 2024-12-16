import SpotifyService from "./services/spotify";

export const encodeQueryParams = (params) =>
  Object.keys(params)
    .map(
      (param) =>
        `${encodeURIComponent(param)}=${encodeURIComponent(params[param])}`
    )
    .join("&");

export const getTokenAuthorizationUrl = () => {
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

export const getAuthorizationTokenFromHash = () => {
  const hash = window.location.hash;
  const params = new URLSearchParams(hash.slice(1)); // Remove the '#' at the beginning
  return params.get("access_token");
};

export const getTrackOldPosition = (track, oldList) => {
  const addedAtDate = track.added_at;
  const trackId = track.track.id;
  const oldPosition = oldList.findIndex(
    (t) => t.added_at === addedAtDate && t.track.id === trackId
  );

  return oldPosition;
};

export const moveElementInArray = (arr, old_index, new_index) => {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;
};

const orderTypes = {
  MostRecent: (a, b) => new Date(b.added_at) - new Date(a.added_at),
  MostOld: (a, b) => new Date(a.added_at) - new Date(b.added_at),
};

export const sortPlaylistTracks = (trackList, orderType) => {
  const sortFunction = orderTypes[orderType];

  const sortedPlaylistTracks = [...trackList].sort(sortFunction);

  return sortedPlaylistTracks;
};

export const revertPlaylistOrder = async (
  playlistInfo,
  modifiedTrackList,
  onError
) => {
  // Debería tener guardado el orden original (guardarlo en localStorage al darle a ordenar por)
  // antes de hacer el sort
  // e iterar sobre el nuevo poniendo los elementos la posición vieja
  // en base a cada nuevo snapshot.

  // En el for poner la original en orden inverso.
  // Luego sacar del orden actual el indice de la canción y
  // aplicarlo sobre el snapshot_id actual.

  const playlistUri = playlistInfo.id;

  const localStorageItem = window.localStorage.getItem(
    `ManagePlaylist_OriginalOrder_${playlistUri}`
  );

  if (!localStorageItem)
    return alert(
      `Not previous order available to recover for the playlist ${playlistInfo.name}`
    );

  console.log(JSON.parse(localStorageItem))

  const { originalTrackList, old_snapshot_id } = JSON.parse(localStorageItem);

  let updatedTracklist = [...modifiedTrackList];
  let { snapshot_id } = await SpotifyService.getPlaylistInfo(playlistUri);

  for (const [index, track] of [...originalTrackList].reverse().entries()) {
    const oldPosition = getTrackOldPosition(track, updatedTracklist);

    const newOrder = {
      range_start: oldPosition,
      insert_before: 0,
      range_length: 1,
      snapshot_id,
    };

    try {
      const response = await SpotifyService.reorderPlaylistItem({
        order: newOrder,
        playlistUri,
      });
      console.log({ oldPosition, index, date: track.added_at, response });

      // Recoger el id de estado de la nueva playlist
      // para revertir el orden de la siguiente canción sobre esa.
      snapshot_id = response.snapshot_id;

      // Realizar yo el nuevo orden en local en vez de solicitarlo
      // para evitar baneo por horas (retryAfter)!!
      updatedTracklist = moveElementInArray(updatedTracklist, oldPosition, 0);
    } catch (error) {
      return onError(error);
    }
  }

  const updatedPlaylistInfo = await SpotifyService.getPlaylistInfo(playlistUri);
  return { updatedPlaylistInfo, originalTrackList };
};

export const postNewPlaylistOrder = async (
  playlistInfo,
  modifiedTrackList,
  onError
) => {
  const originalTrackList = playlistInfo.tracks.items;
  const playlistUri = playlistInfo.id;
  let snapshot_id = playlistInfo.snapshot_id;

  window.localStorage.setItem(
    `ManagePlaylist_OriginalOrder_${playlistUri}`,
    JSON.stringify({ originalTrackList, snapshot_id })
  );

  let updatedTracklist = [...originalTrackList];

  for (const [index, track] of [...modifiedTrackList].reverse().entries()) {
    const oldPosition = getTrackOldPosition(track, updatedTracklist);

    const newOrder = {
      range_start: oldPosition,
      insert_before: 0,
      range_length: 1,
      snapshot_id,
    };

    try {
      const response = await SpotifyService.reorderPlaylistItem({
        order: newOrder,
        playlistUri,
      });
      console.log({ oldPosition, index, date: track.added_at, response });

      // Recoger el id de estado de la nueva playlist
      // para modificar el orden de la siguiente canción sobre esa.
      snapshot_id = response.snapshot_id;

      // Realizar yo el nuevo orden en local en vez de solicitarlo
      // para evitar baneo por horas (retryAfter)!!
      updatedTracklist = moveElementInArray(
        updatedTracklist,
        oldPosition,
        0
      );
    } catch (error) {
      return onError(error)
    }
  }

  const updatedPlaylistInfo = await SpotifyService.getPlaylistInfo(playlistUri);
  return { updatedPlaylistInfo, modifiedTrackList };
};

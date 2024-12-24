import { useCallback, useEffect, useState } from "react";
import { useErrorHandler } from ".";
import SpotifyService from "../services/spotify";

const orderTypes = {
  MostRecent: (a, b) => new Date(b.added_at) - new Date(a.added_at),
  MostOld: (a, b) => new Date(a.added_at) - new Date(b.added_at),
  NameAZ: (a, b) => a.track.name.localeCompare(b.track.name),
  NameZA: (a, b) => b.track.name.localeCompare(a.track.name),
  ArtistAZ: (a, b) =>
    a.track.artists[0].name.localeCompare(b.track.artists[0].name),
  ArtistZA: (a, b) =>
    b.track.artists[0].name.localeCompare(a.track.artists[0].name),
  MostDuration: (a, b) => b.track.duration_ms - a.track.duration_ms,
  LessDuration: (a, b) => a.track.duration_ms - b.track.duration_ms,
  MostPopular: (a, b) => b.track.popularity - a.track.popularity,
  LessPopular: (a, b) => a.track.popularity - b.track.popularity,
  Default: () => 1,
};

const sortTracks = (trackList, orderType) => {
  const sortFunction = orderTypes[orderType];

  const sortedTracks = [...trackList].sort(sortFunction);

  return sortedTracks;
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

const getTrackOldPosition = (track, oldList) => {
  const addedAtDate = track.added_at;
  const trackId = track.track.id;
  const oldPosition = oldList.findIndex(
    (t) => t.added_at === addedAtDate && t.track.id === trackId
  );

  return oldPosition;
};

const fetchRemainingTracks = (currentInfo, playlistUri) => {
  console.log(currentInfo);
  if (currentInfo.tracks.items.length >= currentInfo.tracks.total) {
    return Promise.resolve(currentInfo);
  }

  return SpotifyService.getPlaylistTracks(
    playlistUri,
    50,
    currentInfo.tracks.items.length
  ).then((response) => {
    console.log({ response, currentInfo });
    currentInfo.tracks.items = currentInfo.tracks.items.concat(response.items);
    currentInfo.next = response.next;
    return fetchRemainingTracks(currentInfo, playlistUri);
  });
};

const changePlaylistOrder = async (
  playlistUri,
  targetTrackList,
  originalTrackList,
  initialSnapshot_id,
  onError
) => {
  let snapshot_id = initialSnapshot_id;

  let updatedTracklist = [...originalTrackList];

  for (const [index, track] of [...targetTrackList].reverse().entries()) {
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
};

const revertPlaylistOrder = async (
  playlistInfo,
  modifiedTrackList,
  onError
) => {
  const playlistUri = playlistInfo.id;

  const localStorageItem = window.localStorage.getItem(
    `ManagePlaylist_OriginalOrder_${playlistUri}`
  );

  if (!localStorageItem)
    return alert(
      `Not previous order available to recover for the playlist ${playlistInfo.name}`
    );

  console.log("this is: ", JSON.parse(localStorageItem));

  const { originalTrackList, old_snapshot_id } = JSON.parse(localStorageItem);
  let { snapshot_id } = await SpotifyService.getPlaylistInfo(playlistUri);

  await changePlaylistOrder(
    playlistUri,
    originalTrackList,
    modifiedTrackList,
    snapshot_id,
    onError
  );

  const updatedPlaylistInfo = await SpotifyService.getPlaylistInfo(playlistUri);
  return { updatedPlaylistInfo, originalTrackList };
};

const postNewPlaylistOrder = async (
  playlistInfo,
  modifiedTrackList,
  onError
) => {
  const originalTrackList = playlistInfo.tracks.items;
  const playlistUri = playlistInfo.id;
  const originalSnapshot_id = playlistInfo.snapshot_id;

  window.localStorage.setItem(
    `ManagePlaylist_OriginalOrder_${playlistUri}`,
    JSON.stringify({ originalTrackList, originalSnapshot_id })
  );

  await changePlaylistOrder(
    playlistUri,
    modifiedTrackList,
    originalTrackList,
    originalSnapshot_id,
    onError
  );

  const updatedPlaylistInfo = await SpotifyService.getPlaylistInfo(playlistUri);
  return { updatedPlaylistInfo, modifiedTrackList };
};

const usePlaylistInfo = (playlistUri) => {
  const handleError = useErrorHandler();
  const [playlistInfo, setPlaylistInfo] = useState();
  const [trackList, setTrackList] = useState([]);

  const loadPlaylistInfo = useCallback(() => {
    SpotifyService.getPlaylistInfo(playlistUri)
      .then((playlistInfo) => fetchRemainingTracks(playlistInfo, playlistUri))
      .then((playlistInfo) => {
        console.log({ playlistInfo });
        setPlaylistInfo(playlistInfo);
        setTrackList([...playlistInfo.tracks.items]);
      })
      .catch((error) => {
        handleError(error);
      });
  }, [handleError]);

  const virtualSortTracks = (orderType) => {
    const sortedPlaylistTracks = sortTracks(
      playlistInfo.tracks.items,
      orderType
    );

    console.log(sortedPlaylistTracks);
    setTrackList(sortedPlaylistTracks);
  };

  const revertOrder = async () => {
    if (SpotifyService.hasTokenExpired()) {
      return handleError(SpotifyService.TOKEN_EXPIRATION_ERROR);
    }

    const { updatedPlaylistInfo, originalTrackList } =
      await revertPlaylistOrder(playlistInfo, trackList, handleError);

    setPlaylistInfo(updatedPlaylistInfo);
    setTrackList(originalTrackList);
  };

  const postVirtualOrder = async () => {
    if (SpotifyService.hasTokenExpired()) {
      return handleError(SpotifyService.TOKEN_EXPIRATION_ERROR);
    }

    const { updatedPlaylistInfo, modifiedTrackList } =
      await postNewPlaylistOrder(playlistInfo, trackList, handleError);

    setPlaylistInfo(updatedPlaylistInfo);
    setTrackList(modifiedTrackList);
  };

  useEffect(() => {
    loadPlaylistInfo();
  }, []);

  return [
    playlistInfo,
    trackList,
    loadPlaylistInfo,
    virtualSortTracks,
    postVirtualOrder,
    revertOrder,
  ];
};

export default usePlaylistInfo;

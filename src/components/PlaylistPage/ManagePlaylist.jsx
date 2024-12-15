import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SpotifyService from "../../services/spotify";
import utils from "../../utils";

const ManagePlaylist = () => {
  const [playlistInfo, setPlaylistInfo] = useState();
  const [trackList, setTrackList] = useState([]);
  const params = useParams();
  const playlistUri = params.id;
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        let tracksInfo = await SpotifyService.getPlaylistInfo(playlistUri);
        console.log(tracksInfo);
        while (tracksInfo.tracks.items.length < tracksInfo.tracks.total) {
          const { items, next } = await SpotifyService.getPlaylistTracks(
            playlistUri,
            50,
            tracksInfo.tracks.items.length
          );

          tracksInfo.tracks.items = tracksInfo.tracks.items.concat(items);
          tracksInfo.tracks.next = next;
        }

        console.log({ tracksInfo });

        setPlaylistInfo(tracksInfo);
        setTrackList(tracksInfo.tracks.items);
      } catch (error) {
        if (error.response?.data?.error) {
          console.error(error.response.data.error);
          if (error.response.data.error.status === 401) navigate("/");
        } else console.error(error);
      }
    })();
  }, [navigate, playlistUri]);

  const handlePreview = (event) => {
    event.preventDefault();

    const sortedPlaylistTracks = [...playlistInfo.tracks.items].sort(
      (a, b) => new Date(b.added_at) - new Date(a.added_at)
    );

    console.log(sortedPlaylistTracks);
    setTrackList(sortedPlaylistTracks);
  };

  const handleRevert = async (event) => {
    event.preventDefault();

    // Debería tener guardado el orden original (guardarlo en localStorage al darle a ordenar por) antes de hacer el sort 
    // e iterar sobre el nuevo poniendo los elementos la posición vieja
    // en base a cada nuevo snapshot.

    const {originalTrackList, snapshot_id} = JSON.parse(window.localStorage.getItem(`ManagePlaylist_OriginalOrder_${playlistUri}`))

    if (!originalTrackList)
      return alert(`Not previous order available to recover for the playlist ${playlistInfo.name}`)

    const newOrder = {
      range_start: 1,
      insert_before: 0,
      range_length: 5,
    };

    try {
      const response = await SpotifyService.reorderPlaylistItem({
        order: newOrder,
        playlistUri,
      });
      // console.log({ index, response });
    } catch (error) {
      if (error.response?.data?.error) {
        console.error(error.response.data.error);
        if (error.response.data.error.status === 401) navigate("/");
      } else console.error(error);
    }

    // let count = 0;
    // for (const [index, track] of originalTrackList.reverse().entries()) {
    //   const oldPosition = utils.getTrackOldPosition(track, originalTrackList);

    //   const newOrder = {
    //     range_start: count,
    //     insert_before: 0,
    //     range_length: originalTrackList.length,
    //     snapshot_id: "AAAArMvavbUacBiJwmewwikZ99RVPLM4",
    //   };

    //   try {
    //     const response = await SpotifyService.reorderPlaylistItem({
    //       order: newOrder,
    //       playlistUri,
    //     });
    //     console.log({ index, response });
    //   } catch (error) {
    //     if (error.response?.data?.error) {
    //       console.error(error.response.data.error);
    //       if (error.response.data.error.status === 401) navigate("/");
    //     } else console.error(error);
    //   }

    //   count++;
    // }

    console.log("HOLA");
    setTrackList(playlistInfo.tracks.items);
  };

  const handlePublishNewOrder = async (event) => {
    event.preventDefault();

    const originalTrackList = playlistInfo.tracks.items;
    const modifiedTrackList = trackList;
    let snapshot_id = playlistInfo.snapshot_id;

    window.localStorage.setItem(`ManagePlaylist_OriginalOrder_${playlistUri}`, JSON.stringify({originalTrackList, snapshot_id}))

    let updatedTracksInfo = [...originalTrackList];

    for (const [index, track] of modifiedTrackList.reverse().entries()) {
      const oldPosition = utils.getTrackOldPosition(track, updatedTracksInfo);

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
        updatedTracksInfo = utils.moveElementInArray(
          updatedTracksInfo,
          oldPosition,
          0
        );

      } catch (error) {
        if (error.response?.data?.error) {
          console.error(error.response.data.error);
          if (error.response.data.error.status === 401) navigate("/");
        } else console.error(error);
      }
    }
  };

  if (!playlistInfo) return <div>Loading tracklists...</div>;

  return (
    <>
      <h2>{playlistInfo.name}</h2>
      <p>Number of songs: {playlistInfo.tracks.total}</p>
      <button onClick={handlePreview}>Order by most recent added</button>
      <button onClick={handlePublishNewOrder}>Publish new order</button>
      <button onClick={handleRevert}>Revert order change</button>
      <ol>
        {trackList.map((t) => (
          <li key={t.track.id}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <img
                src={
                  t.track.album.images[0]?.url ||
                  "https://via.placeholder.com/64"
                }
                width={60}
                height={60}
                alt={`${t.track.name} cover`}
              />
              <div
                style={{
                  marginLeft: "10px",
                }}
              >
                <p>
                  <strong>{t.track.name}</strong>
                </p>
                <p>{t.track.artists.map((artist) => artist.name).join(", ")}</p>
                <p>Added: {t.added_at.replace("T", " ").replace("Z", "")}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
};

export default ManagePlaylist;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SpotifyService from "../../services/spotify";
import * as utils from "../../utils";

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

    const sortedPlaylistTracks = utils.sortPlaylistTracks(
      playlistInfo.tracks.items,
      "MostRecent"
    );

    console.log(sortedPlaylistTracks);
    setTrackList(sortedPlaylistTracks);
  };

  const handleError = (error) => {
    if (error.response?.data?.error) {
      console.error(error.response.data.error);
      if (error.response.data.error.status === 401) navigate("/");
    } else console.error(error);
  };

  const handleRevertOrder = async (event) => {
    event.preventDefault();

    const { updatedPlaylistInfo, originalTrackList } =
      await utils.revertPlaylistOrder(playlistInfo, trackList, handleError);

    setPlaylistInfo(updatedPlaylistInfo);
    setTrackList(originalTrackList);
  };

  const handlePublishNewOrder = async (event) => {
    event.preventDefault();

    const { updatedPlaylistInfo, modifiedTrackList } =
      await utils.postNewPlaylistOrder(playlistInfo, trackList, handleError);
    
    setPlaylistInfo(updatedPlaylistInfo);
  };

  if (!playlistInfo) return <div>Loading tracklists...</div>;

  return (
    <>
      <h2>{playlistInfo.name}</h2>
      <p>Number of songs: {playlistInfo.tracks.total}</p>
      <button onClick={handlePreview}>Order by most recent added</button>
      <button onClick={handlePublishNewOrder}>Publish new order</button>
      <button onClick={handleRevertOrder}>Revert order change</button>
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

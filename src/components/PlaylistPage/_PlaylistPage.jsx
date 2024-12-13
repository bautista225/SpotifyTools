import { useState } from "react";
import SpotifyService from "../../services/spotify";
import PlaylistInfo from "./_PlaylistInfo";
import TrackList from "../Tracks/TrackList";

const cardStyle = {
  container: {
    border: "1px solid #ddd",
    borderRadius: 8,
    padding: 20,
    maxWidth: 500,
    margin: "20px auto",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  input: {
    width: "100%", // Asegura que el input no se desborde
    boxSizing: "border-box", // Incluye padding y border dentro del width
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: 4,
    fontSize: "1rem",
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#1DB954",
    color: "white",
    border: "none",
    borderRadius: 4,
    fontSize: "1rem",
    cursor: "pointer",
    margin: "10px 0",
  },
};

const PlaylistPage = () => {
  const [playlistInfo, setPlaylistInfo] = useState({});
  const [playlistUri, setPlaylistUri] = useState(
    import.meta.env.VITE_PLAYLIST_URI || ""
  );
  const [trackList, setTrackList] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    SpotifyService.getPlaylistInfo(playlistUri)
      .then((playlistInfo) => {
        console.log(playlistInfo);
        setPlaylistInfo(playlistInfo);
        setTrackList(playlistInfo.tracks.items);
      })
      .catch((error) => {
        if (error.response?.data?.error) console.error(error.data.error);
        else console.error(error);
      });
  };

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

    for (const [index, track] of playlistInfo.tracks.items.reverse().entries()) {
        const addedAtDate = track.added_at;
        const trackId = track.track.id;
        const oldPosition = trackList.findIndex(
          (t) => t.added_at === addedAtDate && t.track.id === trackId
        );
  
        const newOrder = {
          range_start: oldPosition + 1,
          insert_before: 1,
          range_length: 1,
        };
  
        try {
          const response = await SpotifyService.reorderPlaylistItem({
            order: newOrder,
            playlistUri,
          });
          console.log({ index, response });
        } catch (error) {
          if (error.response?.data?.error) console.error(error.data.error);
          else console.error(error);
        }
      }
  };

  const handlePostNewOrder = async (event) => {
    event.preventDefault();

    for (const [index, track] of trackList.reverse().entries()) {
      const addedAtDate = track.added_at;
      const trackId = track.track.id;
      const oldPosition = playlistInfo.tracks.items.findIndex(
        (t) => t.added_at === addedAtDate && t.track.id === trackId
      );

      const newOrder = {
        range_start: oldPosition + 1,
        insert_before: 1,
        range_length: 1,
      };

      try {
        const response = await SpotifyService.reorderPlaylistItem({
          order: newOrder,
          playlistUri,
        });
        console.log({ index, response });
      } catch (error) {
        if (error.response?.data?.error) console.error(error.data.error);
        else console.error(error);
      }
    }
  };

  return (
    <>
      <div style={cardStyle.container}>
        <h2>Get Playlist Info</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="playlistUri">Playlist URI</label>
          <input
          id="playlistUri"
            style={cardStyle.input}
            placeholder="Enter Playlist URI"
            value={playlistUri}
            onChange={(event) => setPlaylistUri(event.target.value)}
          />
          <button style={cardStyle.button} type="submit">
            Load playlist
          </button>
        </form>
        {playlistInfo.name && <PlaylistInfo playlistInfo={playlistInfo} />}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {playlistInfo.name && (
          <button style={cardStyle.button} onClick={handlePreview}>
            Preview order by most recent
          </button>
        )}
        {playlistInfo.name && (
          <button style={cardStyle.button} onClick={handlePostNewOrder}>
            Apply order
          </button>
        )}
        {playlistInfo.name && (
          <button style={cardStyle.button} onClick={handleRevert}>
            Revert order
          </button>
        )}
      </div>
      {playlistInfo.name && <TrackList tracks={trackList} />}
    </>
  );
};

export default PlaylistPage;

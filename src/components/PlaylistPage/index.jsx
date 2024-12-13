import { useEffect, useState } from "react";
import SpotifyService from "../../services/spotify";
import { useNavigate } from "react-router-dom";

const PlaylistPage = () => {
  const navigate = useNavigate("/");
  const [userPlaylists, setUserPlaylists] = useState();

  useEffect(() => {
    (async () => {
      try {
        let playlistsInfo = await SpotifyService.getUserPlaylists(50);

        while (playlistsInfo.items.length < playlistsInfo.total) {
          const { items, next } = await SpotifyService.getUserPlaylists(
            50,
            playlistsInfo.items.length
          );

          playlistsInfo.items = playlistsInfo.items.concat(items);
          playlistsInfo.next = next;
        }

        console.log({ playlistsInfo });

        setUserPlaylists(playlistsInfo);
      } catch (error) {
        if (error.response?.data?.error) {
          console.error(error.response.data.error);
          if (error.response.data.error.status === 401) navigate("/");
        } else console.error(error);
      }
    })();
  }, [navigate]);

  if (!userPlaylists) return <div>Loading user plalists...</div>;

  console.log(userPlaylists);

  return (
    <>
      <h1>Number of playlists: {userPlaylists.total}</h1>
      <ol>
        {userPlaylists.items.map((pl) => (
          <li key={pl.id}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <img
                src={
                  pl.images
                    ? pl.images[0]?.url || "https://via.placeholder.com/64"
                    : "https://via.placeholder.com/64"
                }
                width={60}
                height={60}
                alt={`${pl.name} cover`}
              />
              <div
                style={{
                  marginLeft: "10px",
                }}
              >
                <p>
                  <strong>{pl.name}</strong>
                </p>
                <p>{pl.description}</p>
                <p>Owner: {pl.owner.display_name}</p>
                <p>Number of tracks: {pl.tracks.total}</p>
                <button onClick={() => navigate(`/playlists/${pl.id}`)}>
                  Manage playlist
                </button>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
};

export default PlaylistPage;

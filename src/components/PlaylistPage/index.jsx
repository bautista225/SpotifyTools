import { useNavigate } from "react-router-dom";
import { useUserPlaylists } from "../../hooks";

const PlaylistPage = () => {
  const navigate = useNavigate("/");
  const [userPlaylists] = useUserPlaylists();

  if (!userPlaylists) return <div>Loading user plalists...</div>;

  console.log(userPlaylists);

  return (
    <div className="mt-5 pt-4">
      <h1>You have a total of {userPlaylists.total} playlists</h1>
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
    </div>
  );
};

export default PlaylistPage;

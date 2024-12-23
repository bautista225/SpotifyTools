import { useNavigate } from "react-router-dom";
import { useUserPlaylists } from "../../hooks";
import FooterBar from "../FooterBar/index";
import PlaylistPageSkeleton from "./PlaylistPageSkeleton";

const PlaylistPage = () => {
  const navigate = useNavigate("/");
  const [userPlaylists] = useUserPlaylists();

  if (!userPlaylists)
    return (
      <>
        <div className="container mt-5 pt-4">
          <PlaylistPageSkeleton />
          <FooterBar />
        </div>
      </>
    );

  console.log(userPlaylists);

  return (
    <>
      <div className="container mt-5 pt-4">
        <div className="px-3 px-md-5 py-5 mb-4 bg-light rounded-3 text-center">
          <h1 className="my-4 mt-md-0">
            You have a total of {userPlaylists.total} playlists
          </h1>
        </div>

        <div className="row g-4 align-items-md-stretch">
          {userPlaylists.items.map((pl) => (
            <div key={pl.id} className="col-md-6">
              <div className="h-100 px-3 py-3 bg-light rounded-3">
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
                    className="me-3 rounded"
                  />
                  <div className="d-flex flex-column">
                    <div>
                      <p>
                        <strong>{pl.name}</strong>
                      </p>
                      <p>{pl.description}</p>
                    </div>
                    <div className="">
                      <p>Owner: {pl.owner.display_name}</p>
                      <p>Number of tracks: {pl.tracks.total}</p>

                      <button
                        className="btn btn-md btn-outline-dark rounded-pill"
                        onClick={() => navigate(`/playlists/${pl.id}`)}
                      >
                        <i className="bi bi-sliders"></i> Manage playlist
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <FooterBar />
      </div>
    </>
  );
};

export default PlaylistPage;

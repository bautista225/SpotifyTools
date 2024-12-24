import { useNavigate } from "react-router-dom";

const PlaylistCard = ({ pl }) => {
  const navigate = useNavigate("/");

  return (
    <div className="col-md-6">
      <div className="h-100 px-3 py-3 bg-light rounded-3">
        <div className="d-flex h-100 flex-row">
          {pl.images && pl.images[0]?.url ? (
            <img
              src={pl.images[0].url}
              width={60}
              height={60}
              alt={`${pl.name} cover`}
              className="me-3 rounded flex-shrink-0 object-fit-cover"
            />
          ) : (
            <div
              className="placeholder rounded me-3 flex-shrink-0"
              style={{
                width: "60px",
                height: "60px",
              }}
            ></div>
          )}

          <div className="d-flex flex-column justify-content-between w-100">
            <div className="row g-2">
              <div className="fw-bold">{pl.name}</div>
              {pl.description && (
                <div className="text-muted">
                  {
                    new DOMParser().parseFromString(pl.description, "text/html")
                      .documentElement.textContent
                  }
                </div>
              )}
              {/* Podríamos añadir los generos de las canciones de la playlist */}
              <div>
                Owner{" "}
                <span className="fw-semibold">{pl.owner.display_name}</span>
              </div>
              <div>
                Tracks <span className="fw-semibold">{pl.tracks.total}</span>
              </div>
            </div>
            <div>
              <button
                className="btn btn-md btn-outline-dark rounded-pill mt-2"
                onClick={() => navigate(`/playlists/${pl.id}`)}
              >
                <i className="bi bi-sliders"></i> Manage playlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;

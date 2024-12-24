import PlaylistInfoSkeleton from "./PlaylistInfoSkeleton";

const PlaylistInfo = ({ playlistInfo }) => {
  if (!playlistInfo) return <PlaylistInfoSkeleton />;

  return (
    <div className="px-5 px-md-5 py-5 mb-4 bg-light rounded-3">
      <div className="row">
        <div className="col-md-5 col-lg-4 text-center">
          {playlistInfo.images && playlistInfo.images[0]?.url ? (
            <img
              src={playlistInfo.images[0].url}
              width={250}
              height={250}
              alt={`${playlistInfo.name} cover`}
              className="rounded"
            />
          ) : (
            <div
              className="placeholder rounded"
              style={{
                width: "250px",
                height: "250px",
              }}
            ></div>
          )}
        </div>
        <div className="col-md-7 col-lg-8 text-center text-md-start d-flex flex-column justify-content-center">
          <div className="row gy-2">
            <h1 className="mt-4 mt-md-0">{playlistInfo.name}!</h1>
            {playlistInfo.description && (
              <div className="text-muted">
                {
                  new DOMParser().parseFromString(
                    playlistInfo.description,
                    "text/html"
                  ).documentElement.textContent
                }
              </div>
            )}
            <div>
              Number of songs{" "}
              <span className="fw-semibold">{playlistInfo.tracks.total}</span>
            </div>
            <div>
              Followers{" "}
              <span className="fw-semibold">
                {playlistInfo.followers.total}
              </span>
            </div>
            <div>
              Owner{" "}
              <span className="fw-semibold">
                {playlistInfo.owner.display_name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistInfo;

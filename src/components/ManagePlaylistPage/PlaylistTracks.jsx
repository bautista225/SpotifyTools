import PlaylistTracksSkeleton from "./PlaylistTracksSkeleton";

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return seconds == 60
    ? minutes + 1 + ":00"
    : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

const PlaylistTracks = ({ trackList }) => {
  if (!trackList || !trackList.length) return <PlaylistTracksSkeleton />;
  return (
    <ol className="list-group list-group-flush py-1">
      {trackList.map(({ track, added_at }, index) => (
        <li key={track.id} className="list-group-item py-3">
          <div className="d-flex align-items-center">
            <div
              className="text-center me-3 flex-shrink-0"
              style={{ width: "1rem" }}
            >
              {index + 1}
            </div>
            <div className="flex-shrink-0">
              <img
                src={
                  track.album.images[0]?.url || "https://via.placeholder.com/64"
                }
                width={60}
                height={60}
                alt={`${track.name} cover`}
                className="me-1 rounded flex-shrink-0 object-fit-cover"
              />
            </div>
            <div className="flex-grow-1 ms-3 ">
              <div className="fw-bold">{track.name}</div>
              <div className="text-muted">
                {track.artists.map((artist) => artist.name).join(", ")}
              </div>
              <div>
                <span className="badge rounded-pill border border-muted text-dark me-2">
                  <i className="bi bi-bar-chart"></i> {track.popularity}
                </span>
                <span className="badge rounded-pill border border-muted text-dark me-2">
                  <i className="bi bi-clock-history"></i>{" "}
                  {millisToMinutesAndSeconds(track.duration_ms)}
                </span>
                <span className="badge rounded-pill border border-muted text-dark">
                  <i className="bi bi-calendar-event"></i>{" "}
                  {added_at.split("T")[0]}{" "}
                  {added_at.split("T")[1].replace("Z", "")}
                </span>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
};

export default PlaylistTracks;

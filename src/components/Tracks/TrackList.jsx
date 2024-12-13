const cardStyle = {
  container: {
    marginTop: 20,
    border: "1px solid #ddd",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 8,
    objectFit: "cover",
    marginRight: 16,
  },
  title: {
    fontWeight: "bold",
    fontSize: "1.2rem",
    marginBottom: 4,
  },
  description: {
    color: "#555",
    marginBottom: 8,
  },
  date: {
    color: "#1DB954",
    fontSize: "0.9rem",
  },
};

const TrackInfo = ({ trackInfo }) => (
  <div style={cardStyle.header}>
    <img
      style={cardStyle.image}
      src={
        trackInfo.track.album.images[0]?.url || "https://via.placeholder.com/64"
      }
      alt={`${trackInfo.track.name} cover`}
    />
    <div>
      <p style={cardStyle.title}>{trackInfo.track.name}</p>
      <p style={cardStyle.description}>
        {trackInfo.track.artists.map((artist) => artist.name).join(", ")}
      </p>
      <p style={cardStyle.date}>{trackInfo.added_at}</p>
    </div>
  </div>
);

const TrackList = ({ tracks }) => (
  <>
    {tracks.map((trackInfo) => (
      <div key={trackInfo.track.id} style={cardStyle.container}>
        <TrackInfo trackInfo={trackInfo} />
      </div>
    ))}
  </>
);

export default TrackList;

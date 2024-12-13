const cardStyle = {
  playlistContainer: {
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
  user: {
    padding: "4px 8px",
    color: "white",
    backgroundColor: "#1DB954",
    borderRadius: 16,
    fontSize: "0.9rem",
    textAlign: "center",
    display: "inline-block",
  },
};

const PlaylistInfoHeader = ({ playlistInfo }) => (
  <div style={cardStyle.header}>
    <img
      style={cardStyle.image}
      src={playlistInfo.images[0]?.url || "https://via.placeholder.com/64"}
      alt={`${playlistInfo.name} cover`}
    />
    <div>
      <p style={cardStyle.title}>{playlistInfo.name}</p>
      <p style={cardStyle.description}>
        {playlistInfo.description || "No description available"}
      </p>
      <p style={cardStyle.user}>{playlistInfo.owner.id}</p>
    </div>
  </div>
);

const PlaylistInfo = ({ playlistInfo }) => (
  <div style={cardStyle.playlistContainer}>
    <PlaylistInfoHeader playlistInfo={playlistInfo} />
  </div>
);

export default PlaylistInfo;

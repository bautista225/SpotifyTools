import { useParams } from "react-router-dom";
import usePlaylistInfo from "../../hooks/usePlaylistInfo";

const ManagePlaylistPage = () => {
  const params = useParams();
  const playlistUri = params.id;
  const [
    playlistInfo,
    trackList,
    loadPlaylistInfo,
    virtualSortTracks,
    postVirtualOrder,
    revertOrder,
  ] = usePlaylistInfo(playlistUri);

  const handlePreview = (event) => {
    event.preventDefault();

    virtualSortTracks("MostRecent");
  };

  const handleRevertOrder = async (event) => {
    event.preventDefault();

    await revertOrder();
  };

  const handlePublishNewOrder = async (event) => {
    event.preventDefault();

    await postVirtualOrder();
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

export default ManagePlaylistPage;

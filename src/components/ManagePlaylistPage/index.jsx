import { useParams } from "react-router-dom";
import usePlaylistInfo from "../../hooks/usePlaylistInfo";
import PlaylistInfo from "./PlaylistInfo";
import PlaylistTracks from "./PlaylistTracks";
import { useState } from "react";

const orderTypes = {
  MostRecent: { value: "MostRecent", label: "recent added" },
  MostOld: { value: "MostOld", label: "older added" },
  NameAZ: { value: "NameAZ", label: "name A-Z" },
  NameZA: { value: "NameZA", label: "name Z-A" },
  ArtistAZ: { value: "ArtistAZ", label: "artist A-Z" },
  ArtistZA: { value: "ArtistZA", label: "artist Z-A" },
  MostDuration: { value: "MostDuration", label: "most duration" },
  LessDuration: { value: "LessDuration", label: "less duration" },
  MostPopular: { value: "MostPopular", label: "most popular" },
  LessPopular: { value: "LessPopular", label: "less popular" },
  Default: { value: "Default", label: "default" },
};

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

  const handleRevertOrder = async (event) => {
    event.preventDefault();

    if (
      !window.confirm(
        "This action will modify your spotify playlist.\nAre you sure to do it?"
      )
    )
      return;

    await revertOrder();
  };

  const handlePublishNewOrder = async (event) => {
    event.preventDefault();

    if (
      !window.confirm(
        "This action will modify your spotify playlist.\nAre you sure to do it?"
      )
    )
      return;

    await postVirtualOrder();
  };

  const [selectedOrder, setSelectedOrder] = useState("Default");

  const handleOrderChange = (event) => {
    setSelectedOrder(event.target.value);
    virtualSortTracks(event.target.value);
  };

  return (
    <div className="container mt-5 pt-4">
      <PlaylistInfo playlistInfo={playlistInfo} />
      <div className="container text-center my-4">
        <div className="row g-3">
          <div className="col-md-5">
            <div className="d-flex justify-content-center align-items-center">
              <p className="fw-semibold m-0 text-nowrap me-3">Order by</p>
              <select
                value={selectedOrder}
                onChange={handleOrderChange}
                className="form-select w-auto rounded-pill outline-dark"
                aria-label="Default select example"
              >
                <option disabled>Select an order</option>
                {Object.values(orderTypes).map((op) => (
                  <option
                    key={op.value}
                    value={op.value}
                    data-mdb-icon={<i className="bi bi-sort-alpha-down"></i>}
                  >
                    {op.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-7">
            <button
              className="btn btn-md btn-outline-success rounded-pill me-3"
              onClick={handlePublishNewOrder}
            >
              <i className="bi bi-file-arrow-up"></i> Publish new order
            </button>
            <button
              className="btn btn-md btn-outline-danger rounded-pill"
              onClick={handleRevertOrder}
            >
              <i className="bi bi-arrow-counterclockwise"></i> Revert
            </button>
          </div>
        </div>
      </div>

      <PlaylistTracks trackList={trackList} />
    </div>
  );
};

export default ManagePlaylistPage;

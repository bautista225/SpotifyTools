import { useParams } from "react-router-dom";
import usePlaylistInfo from "../../hooks/usePlaylistInfo";
import PlaylistInfo from "./PlaylistInfo";
import PlaylistTracks from "./PlaylistTracks";
import { useState } from "react";
import PublishNewOrderButton from "./PublishNewOrderButton";
import RevertOrderButton from "./RevertOrderButton";
import ChooseOrderSelect from "./ChooseOrserSelect";
import useProgressModal from "../../hooks/useProgressModal";

const ManagePlaylistPage = () => {
  const params = useParams();
  const playlistUri = params.id;
  const progressModal = useProgressModal();
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

    progressModal.setDescription("Reseting order of songs, please wait...");
    progressModal.open();
    await revertOrder(progressModal);
    progressModal.close();
  };

  const handlePublishNewOrder = async (event) => {
    event.preventDefault();

    if (
      !window.confirm(
        "This action will modify your spotify playlist.\nAre you sure to do it?"
      )
    )
      return;

    progressModal.setDescription("Ordering songs, please wait...");
    progressModal.open();
    await postVirtualOrder(progressModal);
    progressModal.close();
  };

  const [selectedOrder, setSelectedOrder] = useState("Default");

  const handleOrderChange = (event) => {
    setSelectedOrder(event.target.value);
    virtualSortTracks(event.target.value);
  };

  return (
    <>
      {progressModal.isOpen && progressModal.modalComponent}
      <div className="container mt-5 pt-4">
        <PlaylistInfo playlistInfo={playlistInfo} />
        <div className="container text-center my-4">
          <div className="row g-3">
            <div className="col-md-5">
              <ChooseOrderSelect
                selectedOrder={selectedOrder}
                handleOrderChange={handleOrderChange}
              />
            </div>
            <div className="col-md-7">
              <PublishNewOrderButton
                handlePublishNewOrder={handlePublishNewOrder}
              />
              <RevertOrderButton handleRevertOrder={handleRevertOrder} />
            </div>
          </div>
        </div>

        <PlaylistTracks trackList={trackList} />
      </div>
    </>
  );
};

export default ManagePlaylistPage;

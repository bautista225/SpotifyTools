const PublishNewOrderButton = ({ handlePublishNewOrder }) => (
  <button
    className="btn btn-md btn-outline-success rounded-pill me-3"
    onClick={handlePublishNewOrder}
  >
    <i className="bi bi-file-arrow-up"></i> Publish new order
  </button>
);

export default PublishNewOrderButton;

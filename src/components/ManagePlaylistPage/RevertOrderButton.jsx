const RevertOrderButton = ({ handleRevertOrder }) => (
  <button
    className="btn btn-md btn-outline-danger rounded-pill"
    onClick={handleRevertOrder}
  >
    <i className="bi bi-arrow-counterclockwise"></i> Revert
  </button>
);

export default RevertOrderButton;

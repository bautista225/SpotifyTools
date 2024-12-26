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

const ChooseOrderSelect = ({ selectedOrder, handleOrderChange }) => (
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
);

export default ChooseOrderSelect;

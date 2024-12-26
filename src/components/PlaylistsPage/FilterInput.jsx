const FilterInput = ({ filter, setFilter }) => (
  <div className="input-group">
    <input
      className="form-control border-end-0 border rounded-pill"
      type="search"
      value={filter}
      id="example-search-input"
      placeholder="Type to filter"
      autoComplete="off"
      color="dark"
      onChange={(event) => setFilter(event.target.value)}
    />
    <span className="input-group-append">
      <button
        className="btn btn-outline-dark border rounded-pill"
        type="button"
        style={{ marginLeft: "-40px" }}
      >
        <i className="bi bi-search"></i>
      </button>
    </span>
  </div>
);

export default FilterInput;

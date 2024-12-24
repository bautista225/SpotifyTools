const TopListSkeleton = () => (
  <ol className="list-group list-group-flush py-1">
    {Array.from({ length: 10 }).map((_, index) => (
      <li
        key={index}
        className="list-group-item text-bg-light d-flex align-items-center"
      >
        <div className="text-center me-2" style={{ width: "1rem" }}>
          <p className="mb-0 text-muted placeholder-glow">
            <span className="placeholder col-12"></span>
          </p>
        </div>
        <div
          className="me-3 rounded"
          style={{
            width: "60px",
            height: "60px",
            backgroundColor: "#e9ecef",
            borderRadius: "50%",
          }}
        ></div>
        <div className="flex-grow-1">
          <p className="mb-1 fw-bold placeholder-glow">
            <span className="placeholder col-6"></span>
          </p>
          <p className="mb-0 text-muted placeholder-glow">
            <span className="placeholder col-4"></span>
          </p>
        </div>
      </li>
    ))}
  </ol>
);

export default TopListSkeleton;

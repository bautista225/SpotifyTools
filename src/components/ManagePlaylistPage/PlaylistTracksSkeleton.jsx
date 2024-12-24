const PlaylistTracksSkeleton = () => (
  <ol className="list-group list-group-flush py-1">
    {Array.from({ length: 10 }).map((_, index) => (
      <li
        key={index}
        className="list-group-item py-3 d-flex align-items-center"
      >
        <div className="text-center me-3" style={{ width: "1rem" }}>
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
          <p className="mb-0 fw-bold placeholder-glow">
            <span className="placeholder col-3"></span>
          </p>
          <p className="mb-0 text-muted placeholder-glow">
            <span className="placeholder col-2"></span>
          </p>
          <div className="mt-1 d-flex flex-wrap gap-3">
            <div className="badge rounded-pill border border-muted text-dark placeholder-glow">
              <span className="placeholder col-8"></span>
            </div>
            <div className="badge rounded-pill border border-muted text-dark placeholder-glow">
              <span className="placeholder col-4"></span>
            </div>
            <div className="badge rounded-pill border border-muted text-dark placeholder-glow">
              <span className="placeholder col-4"></span>
            </div>
          </div>
        </div>
      </li>
    ))}
  </ol>
);

export default PlaylistTracksSkeleton;

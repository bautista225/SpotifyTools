const PlaylistPageSkeleton = () => (
  <>
    <div className="px-3 px-md-5 py-5 mb-4 bg-light rounded-3 text-center">
      <h1 className="my-4 mt-md-0 placeholder-glow">
        <span className="placeholder col-6"></span>
      </h1>
    </div>

    <div className="row g-4 align-items-md-stretch">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="col-md-6">
          <div className="h-100 px-3 py-3 bg-light rounded-3">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div
                className="placeholder rounded me-3"
                style={{
                  width: "60px",
                  height: "60px",
                  backgroundColor: "#e9ecef",
                }}
              ></div>
              <div className="d-flex flex-column w-100">
                <div>
                  <p className="placeholder-glow">
                    <span className="placeholder col-7"></span>
                  </p>
                  <p className="placeholder-glow">
                    <span className="placeholder col-9"></span>
                  </p>
                </div>
                <div>
                  <p className="placeholder-glow">
                    <span className="placeholder col-4"></span>
                  </p>
                  <p className="placeholder-glow">
                    <span className="placeholder col-5"></span>
                  </p>
                  <div className="mt-4 d-flex justify-content-start">
                    <div
                      className="bg-secondary bg-opacity-25 rounded-pill"
                      style={{ width: "30%", height: "2.5rem" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </>
);

export default PlaylistPageSkeleton;

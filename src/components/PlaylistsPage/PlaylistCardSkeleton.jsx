const PlaylistCardSkeleton = () => (
  <div className="col-md-6">
    <div className="h-100 px-3 py-3 bg-light rounded-3">
      <div className="d-flex h-100 flex-row">
        {/* Placeholder para la imagen */}
        <div
          className="placeholder-glow flex-shrink-0"
          style={{
            width: "60px",
            height: "60px",
            backgroundColor: "#e9ecef",
          }}
        ></div>

        <div className="d-flex flex-column justify-content-between w-100 ms-3">
          <div className="row g-2">
            {/* Placeholder para el nombre */}
            <div className="fw-bold placeholder-glow">
              <span className="placeholder col-8"></span>
            </div>

            {/* Placeholder para la descripción */}
            <div className="text-muted placeholder-glow">
              <span className="placeholder col-10"></span>
              <span className="placeholder col-6"></span>
            </div>

            {/* Placeholder para el propietario */}
            <div className="placeholder-glow">
              <span className="placeholder col-4"></span>
            </div>

            {/* Placeholder para el número de canciones */}
            <div className="placeholder-glow">
              <span className="placeholder col-5"></span>
            </div>
          </div>

          {/* Placeholder para el botón */}
          <div className="mt-2 placeholder-glow">
            <button
              className="btn btn-md btn-outline-dark rounded-pill disabled placeholder col-4"
              type="button"
            >
              <span className="placeholder col-4"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PlaylistCardSkeleton;

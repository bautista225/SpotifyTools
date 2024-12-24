const PlaylistInfoSkeleton = () => (
  <div className="px-5 px-md-5 py-5 mb-4 bg-light rounded-3">
    <div className="row">
      {/* Columna izquierda con imagen */}
      <div className="col-md-5 col-lg-4 d-flex flex-column align-items-center">
        <div
          className="placeholder-glow"
          style={{
            width: "250px",
            height: "250px",
            backgroundColor: "#e9ecef",
          }}
        ></div>
      </div>

      {/* Columna derecha con información */}
      <div className="col-md-7 col-lg-8 text-center text-md-start d-flex flex-column justify-content-center">
        <div className="row gy-2">
          {/* Placeholder para el título */}
          <h1 className="mt-4 mt-md-0 placeholder-glow">
            <span className="placeholder col-6"></span>
          </h1>

          {/* Placeholder para la descripción */}
          <div className="text-muted placeholder-glow">
            <span className="placeholder col-10"></span>
            <span className="placeholder col-8"></span>
          </div>

          {/* Placeholder para el número de canciones */}
          <div className="placeholder-glow">
            <span className="placeholder col-4"></span>
          </div>

          {/* Placeholder para seguidores */}
          <div className="placeholder-glow">
            <span className="placeholder col-4"></span>
          </div>

          {/* Placeholder para el propietario */}
          <div className="placeholder-glow">
            <span className="placeholder col-4"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PlaylistInfoSkeleton;

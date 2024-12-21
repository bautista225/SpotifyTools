const ProfileInfoSkeleton = () => (
  <div className="row">
    <div className="col-md-6 text-center">
      <div
        className="rounded-circle bg-secondary placeholder"
        style={{
          width: "250px",
          height: "250px",
          margin: "0 auto",
        }}
      ></div>
    </div>
    <div className="col-md-6 text-center text-md-start align-content-center">
      <h1 className="placeholder-glow">
        <span className="placeholder col-6"></span>
      </h1>
      <p className="placeholder-glow">
        <span className="placeholder col-4"></span>
      </p>
      <p className="placeholder-glow">
        <span className="placeholder col-3"></span>
      </p>
      <p className="placeholder-glow">
        <span className="placeholder col-2"></span>
      </p>
      <p className="placeholder-glow">
        <span className="placeholder col-5"></span>
      </p>
      <div className="mt-3">
        <button className="btn btn-secondary disabled placeholder col-4"></button>
      </div>
    </div>
  </div>
);

export default ProfileInfoSkeleton;

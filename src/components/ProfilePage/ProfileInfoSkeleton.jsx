import ProfileInfoBadgeSkeleton from "./ProfileInfoBadgeSkeleton";

const ProfileInfoSkeleton = () => (
  <div className="row">
    <div className="col-md-6 text-center">
      <div
        className="rounded-circle bg-secondary bg-opacity-25 mx-auto"
        style={{
          width: "250px",
          height: "250px",
        }}
      ></div>
    </div>
    <div className="col-md-6 text-center text-md-start d-flex flex-column justify-content-between">
      <div className="my-4 mt-md-0">
        <div
          className="bg-secondary bg-opacity-25 rounded"
          style={{ width: "70%", height: "2rem", margin: "0 auto 1rem auto" }}
        ></div>
      </div>
      <div className="container text-center">
        <div className="row gy-4 row-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="col" key={index}>
              <ProfileInfoBadgeSkeleton />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 d-flex justify-content-center justify-content-md-start">
        <div
          className="bg-secondary bg-opacity-25 rounded-pill"
          style={{ width: "30%", height: "2.5rem" }}
        ></div>
      </div>
    </div>
  </div>
);

export default ProfileInfoSkeleton;

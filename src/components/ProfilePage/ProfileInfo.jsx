import { useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";
import ProfileInfoSkeleton from "./ProfileInfoSkeleton";
import {
  useUserProfile,
  useUserTopArtists,
  useUserTopTracks,
} from "../../hooks";

const ProfileInfo = () => {
  const [userProfile, isUserProfileLoading, loadUserProfile] = useUserProfile();
  const [userTopTracks, isUserTopTracksLoading, loadUserTopTracks] =
    useUserTopTracks("long_term", 10);
  const [userTopArtists, isUserTopArtistsLoading, loadUserTopArtists] =
    useUserTopArtists("long_term", 10);

  const navigate = useNavigate();

  console.log("ProfileInfo - userprofile: ", userProfile);
  console.log("ProfileInfo - userTopTracks: ", userTopTracks);
  console.log("ProfileInfo - userTopArtists: ", userTopArtists);

  if (isUserProfileLoading) return <ProfileInfoSkeleton />;

  return (
    <div className="row">
      <div className="col-md-6 text-center">
        <Image
          src={userProfile.images[0].url}
          roundedCircle
          fluid
          style={{
            width: "250px",
            height: "250px",
            objectFit: "cover", // Mantiene las proporciones y recorta las partes sobrantes.
          }}
        />
      </div>
      <div className="col-md-6 text-center text-md-start d-flex flex-column justify-content-between">
        <h1 className="my-4 mt-md-0">Welcome, {userProfile.display_name}!</h1>
        <div className="container text-center">
          <div className="row gy-4 row-cols-3">
            <div className="col">
              <div className="fw-semibold">{userProfile.product}</div>
              <div>Subscription</div>
            </div>
            <div className="col">
              <div className="fw-semibold">{userProfile.followers.total}</div>
              <div>Followers</div>
            </div>
            <div className="col">
              <div className="fw-semibold">{userProfile.country}</div>
              <div>Country</div>
            </div>
            <div className="col">
              <div className="fw-semibold">Last year</div>
              <div>Listened</div>
            </div>
            <div className="col">
              <div className="fw-semibold">{userTopTracks?.total}</div>
              <div>Tracks</div>
            </div>
            <div className="col">
              <div className="fw-semibold">{userTopArtists?.total}</div>
              <div>Artists</div>
            </div>
          </div>
        </div>
        {/* <div className="d-flex flex-row">
          <div className="d-flex flex-column align-items-center">
            <div className="fw-semibold">{userProfile.product}</div>
            <div>Subscription</div>
          </div>
          <div className="d-flex flex-column align-items-center">
            <div className="fw-semibold">{userProfile.followers.total}</div>
            <div>Followers</div>
          </div>
          <div className="d-flex flex-column align-items-center">
            <div className="fw-semibold">{userProfile.country}</div>
            <div>Country</div>
          </div>
        </div>
        <div className="d-flex flex-row justify-content-around">
          <div className="d-flex flex-column align-items-center">
            <div className="fw-semibold">Last year</div>
            <div>Listened</div>
          </div>
          <div className="d-flex flex-column align-items-center">
            <div className="fw-semibold">{userTopTracks?.total}</div>
            <div>Tracks</div>
          </div>
          <div className="d-flex flex-column align-items-center">
            <div className="fw-semibold">{userTopArtists?.total}</div>
            <div>Artists</div>
          </div>
        </div> */}

        {/* <div className="d-flex flex-column justify-content-between">
          <div className="">
            <div className="col d-flex flex-column align-items-center justify-content-center">
              <div className="fw-semibold">{userProfile.product}</div>
              <div>Subscription</div>
            </div>
            <div className="col d-flex flex-column align-items-center justify-content-center">
              <div className="fw-semibold">{userProfile.followers.total}</div>
              <div>Followers</div>
            </div>
            <div className="col d-flex flex-column align-items-center justify-content-center">
              <div className="fw-semibold">{userProfile.country}</div>
              <div>Country</div>
            </div>
          </div>
          <div className="">
            <div className="col d-flex flex-column align-items-center justify-content-center">
              <div className="fw-semibold">Last year</div>
              <div>Listened</div>
            </div>
            <div className="col d-flex flex-column align-items-center justify-content-center">
              <div className="fw-semibold">{userTopTracks.total}</div>
              <div>Tracks</div>
            </div>
            <div className="col d-flex flex-column align-items-center justify-content-center">
              <div className="fw-semibold">{userTopArtists.total}</div>
              <div>Artists</div>
            </div>
          </div>
        </div> */}

        <div className="mt-4">
          <button
            className="btn btn-md btn-outline-dark rounded-pill"
            onClick={() => navigate("/playlists")}
          >
            <i className="bi bi-music-note-list"></i> Manage playlists
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;

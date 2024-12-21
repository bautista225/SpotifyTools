import { useNavigate } from "react-router-dom";
import { useUserProfile } from "../../hooks";
import { Image } from "react-bootstrap";
import TopTracksCard from "./TopTracksCard";
import TopArtistsCard from "./TopArtistsCard";
import ProfileInfoSkeleton from "./ProfileInfoSkeleton";
import FooterBar from "../FooterBar";

const ProfileInfo = ({ userProfile }) => {
  const navigate = useNavigate();

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
      <div className="col-md-6 text-center text-md-start align-content-center">
        <h1>Welcome, {userProfile.display_name}!</h1>
        <p>
          Subscription: <em>{userProfile.product}</em>
        </p>
        <p>
          Followers: <em>{userProfile.followers.total}</em>
        </p>
        <p>
          Country: <em>{userProfile.country}</em>
        </p>
        <p>
          Your have listened userTopTracks.total tracks during the last year.
        </p>

        <div>
          <button
            className="btn btn-md btn-outline-dark my-2 mx-1 rounded-pill"
            onClick={() => navigate("/playlists")}
          >
            <i className="bi bi-music-note-list"></i> Manage playlists
          </button>
        </div>
      </div>
    </div>
  );
};

const ProfilePage = () => {
  const [userProfile, isUserProfileLoading, loadUserProfile] = useUserProfile();

  console.log("userprofile: ", userProfile);

  return (
    <div className="container mt-5 pt-4">
      <div className="p-5 mb-4 bg-light rounded-3">
        {isUserProfileLoading && <ProfileInfoSkeleton />}
        {!isUserProfileLoading && <ProfileInfo userProfile={userProfile} />}
      </div>

      <div className="row g-4 align-items-md-stretch">
        <div className="col-md-6">
          <TopTracksCard />
        </div>

        <div className="col-md-6">
          <TopArtistsCard />
        </div>
      </div>

      <FooterBar />
    </div>
  );
};

export default ProfilePage;

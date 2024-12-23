import TopTracksCard from "./TopTracksCard";
import TopArtistsCard from "./TopArtistsCard";
import FooterBar from "../FooterBar";
import ProfileInfo from "./ProfileInfo";

const ProfilePage = () => {
  return (
    <div className="container mt-5 pt-4">
      <div className="px-3 px-md-5 py-5 mb-4 bg-light rounded-3">
        <ProfileInfo />
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

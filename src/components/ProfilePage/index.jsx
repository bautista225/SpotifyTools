import TopTracksCard from "./TopTracksCard";
import TopArtistsCard from "./TopArtistsCard";
import ProfileInfo from "./ProfileInfo";
import useProgressModal from "../../hooks/useProgressModal";
import { useUserProfile } from "../../hooks";

const ProfilePage = () => {
  const progressModal = useProgressModal(false);

  useUserProfile(progressModal);

  return (
    <div className="container mt-5 pt-4">
      <ProfileInfo />

      <div className="row g-4 align-items-md-stretch">
        <div className="col-md-6">
          <TopTracksCard />
        </div>

        <div className="col-md-6">
          <TopArtistsCard />
        </div>
      </div>
      {progressModal.modalComponent}
    </div>
  );
};

export default ProfilePage;

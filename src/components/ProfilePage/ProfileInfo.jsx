import { useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";
import ProfileInfoSkeleton from "./ProfileInfoSkeleton";
import {
  useUserProfile,
  useUserTopArtists,
  useUserTopTracks,
} from "../../hooks";
import { useState } from "react";
import ProfileInfoBadgeSkeleton from "./ProfileInfoBadgeSkeleton";

const timeRange = {
  long_term: { value: "long_term", label: "last year" },
  medium_term: { value: "medium_term", label: "6 months" },
  short_term: { value: "short_term", label: "4 weeks" },
};

const ProfileInfo = () => {
  const [userProfile, isUserProfileLoading, loadUserProfile] = useUserProfile();
  const [userTopTracks, isUserTopTracksLoading, loadUserTopTracks] =
    useUserTopTracks(timeRange.long_term.value, 10);
  const [userTopArtists, isUserTopArtistsLoading, loadUserTopArtists] =
    useUserTopArtists(timeRange.long_term.value, 10);
  const [currentTimeRange, setCurrentTimeRange] = useState("long_term");

  const navigate = useNavigate();

  console.log("ProfileInfo - userprofile: ", userProfile);
  console.log("ProfileInfo - userTopTracks: ", userTopTracks);
  console.log("ProfileInfo - userTopArtists: ", userTopArtists);

  if (isUserProfileLoading) return <ProfileInfoSkeleton />;

  const handleChangeTimeRange = (event) => {
    event.preventDefault();

    const currentIndex = Object.keys(timeRange).indexOf(currentTimeRange);
    const newIndex = (currentIndex + 1) % Object.keys(timeRange).length;
    const newValue = Object.keys(timeRange)[newIndex];

    loadUserTopTracks(newValue, 10);
    loadUserTopArtists(newValue, 10);
    setCurrentTimeRange(newValue);
  };

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
            <div className="col" onClick={handleChangeTimeRange}>
              <div className="fw-semibold">
                {timeRange[currentTimeRange].label}{" "}
                <i className="bi bi-arrow-repeat"></i>
              </div>
              <div>Listened</div>
            </div>
            <div className="col">
              {isUserTopTracksLoading && <ProfileInfoBadgeSkeleton />}
              {!isUserTopTracksLoading && (
                <>
                  <div className="fw-semibold">{userTopTracks?.total}</div>
                  <div>Tracks</div>
                </>
              )}
            </div>
            <div className="col">
              {isUserTopArtistsLoading && <ProfileInfoBadgeSkeleton />}
              {!isUserTopArtistsLoading && (
                <>
                  <div className="fw-semibold">{userTopArtists?.total}</div>
                  <div>Artists</div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 text-center">
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

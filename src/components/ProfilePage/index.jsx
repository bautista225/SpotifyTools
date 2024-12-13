import { useEffect, useState } from "react";
import SpotifyService from "../../services/spotify";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState();
  const [topTracks, setTopTracks] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    SpotifyService.getUserProfile()
      .then((userInfo) => setUserProfile(userInfo))
      .catch((error) => {
        if (error.response?.data?.error) {
          console.error(error.response.data.error);
          if (error.response.data.error.status === 401) navigate("/");
        } else console.error(error);
      });

    SpotifyService.getUserTopTracks("long_term", 10)
      .then((userTopTracks) => {
        console.log(userTopTracks);
        setTopTracks(userTopTracks);
      })
      .catch((error) => {
        if (error.response?.data?.error) {
          console.error(error.response.data.error);
          if (error.response.data.error.status === 401) navigate("/");
        } else console.error(error);
      });
  }, [navigate]);

  if (!userProfile || !topTracks) return <div>Loading user profile...</div>;

  console.log(userProfile);

  return (
    <>
      <h1>Welcome, {userProfile.display_name}!</h1>
      <img src={userProfile.images[0].url} />
      <p>
        Subscription: <em>{userProfile.product}</em>
      </p>
      <p>
        Followers: <em>{userProfile.followers.total}</em>
      </p>
      <p>
        Country: <em>{userProfile.country}</em>
      </p>
      <div>
        <button onClick={() => navigate('/playlists')}>Review playlists</button>
        <p>Your have listened {topTracks.total} tracks the last year.</p>{" "}
        <p>Your top 10 are:</p>
        <ol>
          {topTracks.items?.map((trackInfo) => (
            <li key={trackInfo.id}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <img
                  src={
                    trackInfo.album.images[0]?.url ||
                    "https://via.placeholder.com/64"
                  }
                  width={60}
                  height={60}
                  alt={`${trackInfo.name} cover`}
                />
                <div
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  <p>{trackInfo.name}</p>
                  <p>
                    {trackInfo.artists.map((artist) => artist.name).join(", ")}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
};

export default ProfilePage;

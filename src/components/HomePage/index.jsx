import ConnectWithSpotifyButton from "./ConnectWithSpotifyButton";

const Home = () => (
  <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="text-center">
      <h1 className="display-1">Welcome to Spotify Tools!</h1>
      <h2 className="display-6">
        Explore your profile stats and manage your playlists with ease.
      </h2>
      <ConnectWithSpotifyButton />
    </div>
  </div>
);

export default Home;

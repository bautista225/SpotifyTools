import * as utils from "../../utils";

const ConnectWithSpotifyButton = () => {
  const handleConnect = async () => {
    const authUrl = await utils.buildAuthorizationUrl();
    window.location.href = authUrl;
  };

  return (
    <button
      className="btn btn-lg btn-outline-dark my-2 mx-1 rounded-pill"
      onClick={handleConnect}
    >
      <i className="bi bi-spotify" /> Connect with Spotify
    </button>
  );
};

export default ConnectWithSpotifyButton;

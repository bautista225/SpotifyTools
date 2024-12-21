import * as utils from "../../utils";

const ConnectWithSpotifyButton = () => (
  <a
    className="btn btn-lg btn-outline-dark my-2 mx-1 rounded-pill"
    href={utils.getTokenAuthorizationUrl()}
  >
    <i className="bi bi-spotify" /> Connect with Spotify
  </a>
);

export default ConnectWithSpotifyButton
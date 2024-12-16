import * as utils from "../../utils";

const Home = () => (
  <div>
    <h2>
      Welcome to Spotify Tools!
    </h2>
    <p>
      Explore and manage your Spotify playlists and profile with ease.
    </p>
    <a href={utils.getTokenAuthorizationUrl()}>Connect with Spotify</a>
  </div>
);

export default Home;

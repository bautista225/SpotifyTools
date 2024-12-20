import { Routes, Route } from "react-router-dom";
import Home from "./components/HomePage";
import AuthenticationPage from "./components/AuthenticationPage";
import ProfilePage from "./components/ProfilePage";
import PlaylistPage from "./components/PlaylistPage";
import ManagePlaylist from "./components/PlaylistPage/ManagePlaylist";
import { useInitialization } from "./hooks";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function App() {
  const { session } = useSelector(({ session }) => ({
    session,
  }));
  const stateInitializer = useInitialization();

  useEffect(() => {
    console.log("Inicializamos APP");
    stateInitializer();
  }, []);

  return (
    <>
      <header>Spotify Tools</header>
      {!session.access_token ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/authToken" element={<AuthenticationPage />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/authToken" element={<AuthenticationPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/playlists" element={<PlaylistPage />} />
          <Route path="/playlists/:id" element={<ManagePlaylist />} />
          <Route path="/*" element={<h3>404 Page Not Found</h3>} />
        </Routes>
      )}
    </>
  );
}

export default App;

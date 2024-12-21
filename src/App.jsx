import { Routes, Route } from "react-router-dom";
import Home from "./components/HomePage";
import AuthenticationPage from "./components/AuthenticationPage";
import ProfilePage from "./components/ProfilePage";
import PlaylistPage from "./components/PlaylistPage";
import ManagePlaylist from "./components/PlaylistPage/ManagePlaylist";
import { useSessionInitialization, useUserInitialization } from "./hooks";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import NavBar from "./components/NavBar";
import FooterBar from "./components/FooterBar";

function App() {
  const { session, user } = useSelector(({ session, user }) => ({
    session,
    user,
  }));
  const sessionInitializer = useSessionInitialization();
  const userInitializer = useUserInitialization();

  useEffect(() => {
    sessionInitializer();
  }, []);

  useEffect(() => {
    if (session.access_token && !user) userInitializer();
  }, [session.access_token, user]);

  console.log("la sesion es: ", session);
  return (
    <>
      <NavBar user={user} />
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

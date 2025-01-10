import { Routes, Route } from "react-router-dom";
import Home from "./components/HomePage";
import AuthenticationPage from "./components/AuthenticationPage";
import ProfilePage from "./components/ProfilePage";
import PlaylistsPage from "./components/PlaylistsPage";
import ManagePlaylist from "./components/ManagePlaylistPage";
import { useSessionInitialization, useUserInitialization } from "./hooks";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import NavBar from "./components/NavBar";
import { PrivateRoute } from "./components/PrivateRoute";
import NotFound from "./components/NotFoundPage";
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

  return (
    <div className="d-flex vh-100">
    <div className="d-flex w-100 h-100 mx-auto flex-column">
      <NavBar user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authToken" element={<AuthenticationPage />} />
        <Route
          path="/profile"
          element={<PrivateRoute element={<ProfilePage />} />}
        />
        <Route path="/playlists" element={<PrivateRoute />}>
          <Route index element={<PlaylistsPage />} />
          <Route path=":id" element={<ManagePlaylist />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <FooterBar />
    </div>
    </div>
  );
}

export default App;

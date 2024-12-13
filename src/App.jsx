import { Routes, Route } from "react-router-dom";
import Home from "./components/HomePage";
import AuthenticationPage from "./components/AuthenticationPage";
import ProfilePage from "./components/ProfilePage";
import PlaylistPage from "./components/PlaylistPage";
import ManagePlaylist from "./components/PlaylistPage/ManagePlaylist";

function App() {
  return (
    <div>
      <header>Spotify Tools</header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authToken" element={<AuthenticationPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/playlists" element={<PlaylistPage />} />
        <Route path="/playlists/:id" element={<ManagePlaylist />} />
      </Routes>
    </div>
  );
}

export default App;

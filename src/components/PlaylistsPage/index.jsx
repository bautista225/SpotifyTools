import { useUserPlaylists } from "../../hooks";
import FooterBar from "../FooterBar/index";
import PlaylistsInfo from "./PlaylistsInfo";
import PlaylistCard from "./PlaylistCard";
import PlaylistCardSkeleton from "./PlaylistCardSkeleton";

const PlaylistsPage = () => {
  const [userPlaylists] = useUserPlaylists();

  console.log(userPlaylists);

  return (
    <>
      <div className="container mt-5 pt-4">
        <PlaylistsInfo userPlaylists={userPlaylists} />

        <div className="row g-4 align-items-md-stretch">
          {(userPlaylists &&
            userPlaylists.items.map((pl) => (
              <PlaylistCard key={pl.id} pl={pl} />
            ))) ||
            [...Array(6)].map((_, index) => (
              <PlaylistCardSkeleton key={index} />
            ))}
        </div>

        <FooterBar />
      </div>
    </>
  );
};

export default PlaylistsPage;

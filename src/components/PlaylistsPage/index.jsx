import { useUserPlaylists } from "../../hooks";
import FooterBar from "../FooterBar/index";
import PlaylistsInfo from "./PlaylistsInfo";
import PlaylistCard from "./PlaylistCard";
import PlaylistCardSkeleton from "./PlaylistCardSkeleton";
import { useState } from "react";
import FilterInput from "./FilterInput";

const PlaylistsPage = () => {
  const [userPlaylists] = useUserPlaylists();
  const [filter, setFilter] = useState();

  console.log(userPlaylists);

  return (
    <>
      <div className="container mt-5 pt-4">
        <PlaylistsInfo userPlaylists={userPlaylists} />
        <div className="row mb-4">
          <div className="col-md-4 mx-auto">
            <FilterInput filter={filter} setFilter={setFilter} />
          </div>
        </div>
        <div className="row g-4 align-items-md-stretch">
          {(userPlaylists &&
            userPlaylists.items
              .filter((pl) =>
                !filter
                  ? true
                  : pl.name.toLowerCase().includes(filter.toLowerCase())
              )
              .map((pl) => <PlaylistCard key={pl.id} pl={pl} />)) ||
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

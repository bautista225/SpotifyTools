import { useUserPlaylists } from "../../hooks";
import PlaylistsInfo from "./PlaylistsInfo";
import PlaylistCard from "./PlaylistCard";
import PlaylistCardSkeleton from "./PlaylistCardSkeleton";
import { useState } from "react";
import FilterInput from "./FilterInput";
import { devConsoleLog } from "../../utils";

const PlaylistsPage = () => {
  const [userPlaylists] = useUserPlaylists();
  const [filter, setFilter] = useState();

  devConsoleLog(userPlaylists);

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
      </div>
    </>
  );
};

export default PlaylistsPage;

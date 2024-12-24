import PlaylistsInfoSkeleton from "./PlaylistsInfoSkeleton";

const PlaylistsInfo = ({ userPlaylists }) => {
  if (!userPlaylists) return <PlaylistsInfoSkeleton />;
  return (
    <div className="px-3 px-md-5 py-5 mb-4 bg-light rounded-3 text-center">
      <h1 className="my-4 my-md-0">
        You have a total of {userPlaylists.total} playlists
      </h1>
    </div>
  );
};

export default PlaylistsInfo;

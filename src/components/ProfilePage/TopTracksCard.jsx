import { useState } from "react";
import TopListSkeleton from "./TopListSkeleton";
import { useUserTopTracks } from "../../hooks";
import { devConsoleLog } from "../../utils";

const timeRange = {
  long_term: { value: "long_term", label: "last year" },
  medium_term: { value: "medium_term", label: "last 6 months" },
  short_term: { value: "short_term", label: "last 4 weeks" },
};

const TopTracksList = ({ userTopTracks }) => (
  <ol className="list-group list-group-flush py-1">
    {userTopTracks.items?.map((trackInfo, index) => (
      <li
        key={trackInfo.id}
        className="list-group-item text-bg-light d-flex align-items-center"
      >
        <div className="d-flex align-items-center">
          <div
            className="text-center me-3 flex-shrink-0"
            style={{ width: "0.7rem" }}
          >
            {index + 1}
          </div>
          <div className="flex-shrink-0">
            <img
              src={
                trackInfo.album.images[0]?.url ||
                "https://via.placeholder.com/64"
              }
              width={60}
              height={60}
              alt={`${trackInfo.name} cover`}
              className="me-1 rounded flex-shrink-0 object-fit-cover"
            />
          </div>
          <div className="flex-grow-1 ms-2">
            <div className="fw-bold">{trackInfo.name}</div>
            <div className="text-muted">
              {trackInfo.artists.map((artist) => artist.name).join(", ")}
            </div>
          </div>
        </div>
      </li>
    ))}
  </ol>
);

const TopTracksCard = () => {
  const [userTopTracks, isUserTopTracksLoading, loadUserTopTracks] =
    useUserTopTracks("long_term", 10);

  const [selectedTimeRange, setSelectedTimeRange] = useState("long_term");

  const handleTimeRangeChange = (event) => {
    setSelectedTimeRange(event.target.value);
    loadUserTopTracks(event.target.value, 10);
  };

  devConsoleLog({userTopTracks})

  return (
    <div className="h-100 px-4 px-lg-5 py-3 bg-light rounded-3">
      <div className="d-flex justify-content-center align-items-center my-4">
        <p className="fw-semibold m-0 text-nowrap me-3">Top 10 tracks from</p>
        <select
          value={selectedTimeRange}
          onChange={handleTimeRangeChange}
          className="form-select w-auto rounded-pill outline-dark"
          aria-label="Default select example"
        >
          <option disabled>Select a range</option>
          {Object.values(timeRange).map((op) => (
            <option key={op.value} value={op.value}>
              {op.label}
            </option>
          ))}
        </select>
      </div>
      {(isUserTopTracksLoading || !userTopTracks) && <TopListSkeleton />}
    </div>
  );
};

export default TopTracksCard;

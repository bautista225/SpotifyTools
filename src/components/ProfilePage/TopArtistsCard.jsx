import { useState } from "react";
import { useUserTopArtists } from "../../hooks";
import TopListSkeleton from "./TopListSkeleton";

const timeRange = {
  long_term: { value: "long_term", label: "last year" },
  medium_term: { value: "medium_term", label: "last 6 months" },
  short_term: { value: "short_term", label: "last 4 weeks" },
};

const TopArtistsList = ({ userTopArtists }) => (
  <ol className="list-group list-group-flush py-1">
    {userTopArtists.items?.map((artistInfo, index) => (
      <li
        key={artistInfo.id}
        className="list-group-item text-bg-light d-flex align-items-center"
      >
        <div className="text-center me-3" style={{ width: "1rem" }}>
          {index + 1}
        </div>
        <img
          src={artistInfo.images[0]?.url || "https://via.placeholder.com/64"}
          width={60}
          height={60}
          style={{
            width: "60px",
            height: "60px",
            objectFit: "cover", // Mantiene las proporciones y recorta las partes sobrantes.
          }}
          alt={`${artistInfo.name}`}
          className="me-3 rounded flex-shrink-0"
        />
        <div className="flex-grow-1">
          <p className="mb-1 fw-bold">{artistInfo.name}</p>
          <p className="mb-0 text-muted">
            {artistInfo.genres.slice(0, 3).join(", ")}
          </p>
        </div>
      </li>
    ))}
  </ol>
);

const TopArtistsCard = () => {
  const [userTopArtists, isUserTopArtistsLoading, loadUserTopArtists] =
    useUserTopArtists("long_term", 10);

  const [selectedTimeRange, setSelectedTimeRange] = useState("long_term");

  const handleTimeRangeChange = (event) => {
    setSelectedTimeRange(event.target.value);
    loadUserTopArtists(event.target.value, 10);
  };

  return (
    <div className="h-100 px-4 px-md-5 py-3 bg-light rounded-3">
      <div className="d-flex justify-content-center align-items-center my-4">
        <p className="fw-semibold m-0 text-nowrap me-3">Top 10 artists from</p>
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
      {isUserTopArtistsLoading && <TopListSkeleton />}
      {!isUserTopArtistsLoading && (
        <TopArtistsList userTopArtists={userTopArtists} />
      )}
    </div>
  );
};

export default TopArtistsCard;

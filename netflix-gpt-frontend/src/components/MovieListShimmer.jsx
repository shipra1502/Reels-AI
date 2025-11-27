import React from "react";
import MovieCardShimmer from "./MovieCardShimmer";

const MovieListShimmer = () => {
  return (
    <div className="px-6 mb-6">
      {/* Fake section title */}
      <div className="h-7 w-48 bg-zinc-800 rounded-md mb-4 animate-pulse" />

      {/* Horizontal list of shimmer cards */}
      <div className="flex overflow-x-scroll">
        <div className="flex">
          {Array(8)
            .fill(null)
            .map((_, idx) => (
              <MovieCardShimmer key={idx} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MovieListShimmer;

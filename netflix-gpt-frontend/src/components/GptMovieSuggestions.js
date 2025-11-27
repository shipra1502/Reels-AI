import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import MovieListShimmer from "./MovieListShimmer";

const GptMovieSuggestions = () => {
  const { movieNames, movieResults } = useSelector((store) => store.gpt);
  const loading = useSelector((store) => store.gpt.loading);

  // nothing to render if no data and not loading
  if (!movieNames && !loading) return null;

  // while loading show shimmer that visually matches MovieList layout
  if (loading) {
    // show a few shimmer rows — number matches how many movieNames you'd expect
    // you can tune count or render based on previous movieNames length if available
    return (
      <div className="p-4 m-4 bg-black text-white bg-opacity-90">
        <MovieListShimmer />
        <MovieListShimmer />
        <MovieListShimmer />
      </div>
    );
  }
  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-90">
      <div>
        {movieNames.map((movieName, index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={movieResults[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;

import React, { useRef, useState } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { gptMoviesApi } from "../api/gptMoviesApi";
import { addGptMovieResults, setLoading } from "../utils/gptSlice";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.language);
  const loading = useSelector((store) => store.gpt.loading);
  const searchText = useRef(null);
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const searchMovieTMDB = async (movie) => {
    try {
      // if movie looks like a TMDb object, return it as-is
      if (
        movie &&
        typeof movie === "object" &&
        (movie.id || movie.title || movie.original_title)
      ) {
        return [movie]; // keep same shape as TMDb "results" array
      }

      const res = await fetch(
        "https://api.themoviedb.org/3/search/movie?query=" +
          movie +
          "&include_adult=false&language=en-US&page=1",
        API_OPTIONS
      );

      if (!res.ok) {
        return [];
      }

      const json = await res.json();

      return json.results ?? [];
    } catch (err) {
      return [];
    }
  };

  const handleGptSearchClick = async () => {
    setError("");
    dispatch(setLoading(true));

    try {
      const query = searchText.current.value;

      if (!query) {
        throw new Error("Please enter a movie or genre");
      }

      const gptResults = await gptMoviesApi(query);

      if (!gptResults || !gptResults.success) {
        throw new Error("Search failed. Please try again.");
      }

      // 🎬 DETAILS MODE (single movie)
      if (gptResults.mode === "DETAILS") {
        const tmdbResults = await searchMovieTMDB(gptResults.query);
        if (!tmdbResults || tmdbResults.length === 0) {
          throw new Error("Movie not found. Try another title.");
        }

        dispatch(
          addGptMovieResults({
            movieNames: [gptResults.query],
            movieResults: [tmdbResults],
          })
        );

        return;
      }

      // 🎥 RECOMMENDATIONS MODE
      if (gptResults.mode === "RECOMMENDATIONS") {
        if (!gptResults.movies || gptResults.movies.length === 0) {
          throw new Error("No recommendations found");
        }

        const movieNames = gptResults.movies;

        const tmdbResults = await Promise.all(
          movieNames.map((movie) => searchMovieTMDB(movie))
        );

        dispatch(
          addGptMovieResults({
            movieNames,
            movieResults: tmdbResults,
          })
        );

        return;
      }

      throw new Error("Unexpected response from server");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-1 m-4 md:p-6 md:m-6 col-span-9 rounded-md"
          placeholder={lang[langKey].gptSearchPlaceHolder}
        />

        <button
          className="py-3 md:py-2 px-0 md:px-4 m-3 md:m-4 col-span-3 bg-red-700 text-white rounded-md"
          onClick={handleGptSearchClick}
          disabled={loading}
        >
          {lang[langKey].search}
        </button>

        {error && (
          <div className="col-span-12 px-6 pb-4 -mt-2">
            <div className="bg-red-900/30 border-l-4 border-red-500 p-4">
              <p className="text-red-300 font-medium">{error}</p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default GptSearchBar;

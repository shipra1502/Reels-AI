import React, { useRef, useState } from "react";
import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";
import OpenAI from "openai";
import { API_OPTIONS, OPENAI_API_KEY } from "../utils/constants";
import openAi from "../utils/openAi";
import { gptMoviesApi } from "../api/gptMoviesApi";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.language);
  const searchText = useRef(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState("");

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const jsonData = await data.json();
    return jsonData.results;
  };

  const handleGptSearchClick = async () => {
    setError("");
    setResults("");
    setLoading(true);

    try {
      const extractMovieNames = (text) => {
        const regex = /\*\*([^*\n]+?)\s*\(\d{4}\)\*\*/g;
        const movies = [];
        let match;

        while ((match = regex.exec(text)) !== null) {
          movies.push(match[1].trim()); // only name
        }
        return movies;
      };
      const gptQuery =
        "Act as a movie recommendation engine. Recommend movies based on: " +
        searchText.current.value;
      const gptResults = await gptMoviesApi(gptQuery);
      const movies = extractMovieNames(gptResults.message);
      setResults(movies);
      const data = movies.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(data);
      console.log("GPT Results:", tmdbResults);
      if (!gptResults.message) throw new Error("Empty GPT Response");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          ref={searchText}
          type="text"
          className="p-6 m-6 col-span-9 rounded-md"
          placeholder={lang[langKey].gptSearchPlaceHolder}
        ></input>

        <button
          className="py-2 px-4 m-4 col-span-3 bg-red-700 text-white rounded-md"
          onClick={handleGptSearchClick}
          disabled={loading}
        >
          {lang[langKey].search}
        </button>
        {error && (
          <div className="col-span-12 px-6 pb-4 -mt-2">
            <div className="bg-red-900/30 border-l-4 border-red-500 p-4 ">
              <p className="text-red-300 font-medium">{error}</p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default GptSearchBar;

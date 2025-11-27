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
    dispatch(setLoading(true));

    try {
      const extractMovieNames = (input, opts = {}) => {
        const stripParens = opts.stripParens ?? true;
        const titles = [];
        const seen = new Set();
        if (input === null || input === undefined) return titles;

        const cleanTitle = (raw) => {
          let t = raw.trim();
          t = t.replace(/\(\d{4}\)$/, "").trim(); // remove (YYYY)
          if (stripParens) t = t.replace(/\s*\([^)]{1,120}\)\s*$/, "").trim(); // remove trailing parentheses
          return t;
        };

        const pushTitle = (raw) => {
          const t = cleanTitle(raw);
          if (!t) return;
          const key = t.toLowerCase();
          if (!seen.has(key)) {
            seen.add(key);
            titles.push(t);
          }
        };

        // Handle TMDb array/object
        if (typeof input === "object") {
          const arr = Array.isArray(input)
            ? input
            : input.results ?? input.items ?? [input];

          arr.forEach((item) => {
            if (!item) return;
            if (typeof item === "string") return pushTitle(item);

            const rawTitle =
              item.title ??
              item.name ??
              item.original_title ??
              item.original_name ??
              null;

            if (rawTitle) return pushTitle(rawTitle);

            pushTitle(JSON.stringify(item)); // fallback
          });

          return titles;
        }

        // Treat as plain text
        const text = String(input);
        const lines = text.split(/\r?\n/);
        const boldRegex = /\*\*([^*]+?)\*\*/g;

        lines.forEach((rawLine) => {
          const line = rawLine.trim();
          if (!line) return;

          // Bold extraction
          let match;
          let foundBold = false;
          while ((match = boldRegex.exec(line)) !== null) {
            foundBold = true;

            let raw = match[1].trim();

            const after = line
              .slice(match.index + match[0].length)
              .match(/^\s*\((\d{4})\)/);

            if (after && !raw.match(/\(\d{4}\)$/)) {
              raw = `${raw} (${after[1]})`;
            }

            pushTitle(raw);
          }

          if (foundBold) return;

          // fallback: "1. Title (2019) - desc"
          const clean = line
            .replace(/^\d+\.\s*/, "")
            .replace(/^[*-]\s*/, "")
            .split(/\s-\s/)[0]
            .trim();

          if (clean.length > 1 && clean.length < 200) pushTitle(clean);
        });

        return titles;
      };
      const gptQuery =
        "Act as a movie recommendation engine. Recommend movies based on: " +
        searchText.current.value;
      const gptResults = await gptMoviesApi(gptQuery);
      const movies = extractMovieNames(gptResults.message);
      const data = movies.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(data);
      dispatch(
        addGptMovieResults({ movieNames: movies, movieResults: tmdbResults })
      );
      if (!gptResults.message) throw new Error("Empty GPT Response");
    } catch (err) {
      setError(err.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-6 m-6 col-span-9 rounded-md"
          placeholder={lang[langKey].gptSearchPlaceHolder}
        />

        <button
          className="py-2 px-4 m-4 col-span-3 bg-red-700 text-white rounded-md"
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

import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    gptMovies: null,
    movieNames: null,
    movieResults: null,
    loading: false,
  },
  reducers: {
    toogleGptSearchView: (state, action) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptMovieResults: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { toogleGptSearchView, addGptMovieResults, setLoading } =
  gptSlice.actions;
export default gptSlice.reducer;

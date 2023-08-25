import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import React from "react";
import axios from "axios";
import { APIKey } from "../fakeApi/apikey";
import api from "../fakeApi/api";

export const fetchmovie = createAsyncThunk(
  "movie/fetchmovie",
  //  async() => {
  //   const response = await axios.create(
  //     // `http://www.omdbapi.com/?i=tt3896198&apikey=${b372f2d2}`
  //     {
  //       baseURL: "http://www.omdbapi.com",
  //       headers: {
  //           "Content-Type": "application/json",
  //           "x-api-key":"b372f2d2",
  //       },
  //     }
  //   );
  //   console.log(response, "response1");
  //   return response.data;
  // }
  async (searchText) => {
    console.log("searchText ==>", searchText);
    if (searchText === undefined || searchText === "") {
      const movieText = "all";
      const response = await api.get(
        `?apiKey=${APIKey}&s=${movieText}&type=movie&page=1`
      );
      console.log(response.data.Search);
      return response.data.Search;
    } else {
      const response = await api.get(
        `?apiKey=${APIKey}&s=${searchText}&type=movie`
      );
      console.log(response.data.Search);
      return response.data.Search;
    }
  }
);
const initialState = {
  movie: [],
  moviefav: [],
  status: "idle",
  error: null,
};

export const MovieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    addtoFav: (state, action) => {
      state.moviefav.push(action.payload);
      console.log(state.moviefav, "action=====", action.payload);
    },
    removeItem: (state, action) => {
      state.moviefav = state.moviefav.filter(
        (item) => item.id != action.payload
      );
      console.log(action.payload, "payloadid");

      console.log(state.moviefav, "moviefav");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchmovie.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchmovie.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movie = action.payload;
      })
      .addCase(fetchmovie.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const selectAllmovie = (state) => state.movies.movie;

export const getmovieStatus = (state) => state.movies.status;
export const getmovieError = (state) => state.movies.error;
export const { addtoFav, removeItem } = MovieSlice.actions;

export const selectFavorites = (state) => state.movies.moviefav;
export const movieReducer = MovieSlice.reducer;

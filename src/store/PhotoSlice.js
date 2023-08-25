import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import React from "react";
import axios from "axios";

export const fetchPhotos = createAsyncThunk("photos/fetchPhotos", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/photos"
  );
  console.log(response, "response");
  return response;
});
const initialState = {
  photos: [],
  status: "idle",
  error: null,
};

export const PhotoSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.photos = action.payload;
      })
      .addCase(fetchPhotos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const selectAllPhotos = (state) => state.photos.photos;

export const getPhotosStatus = (state) => state.photos.status;
export const getPhotosError = (state) => state.photos.error;
export const photoReducer = PhotoSlice.reducer;

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./CreateSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { rocketReducer, rocketsReducer } from "./PartSlice";
import { createTransform } from "redux-persist";
import { photoReducer } from "./PhotoSlice";
import { userSliceReducer } from "./MultipleSlice";
import { movieReducer } from "./MovieSlice";

const persistConfig = {
  key: "root",
  storage,
  // blacklist:["cart"]
};

// const rootReducer = combineReducers({
//   // posts: postsReducer,
//   cart: cartReducer,
//   rockets: rocketsReducer,
// });

const persistedReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    cart: persistedReducer,
    rockets: rocketReducer,
    user: userSliceReducer,
    photos: photoReducer,
    movies: persistedReducer,
  },
});

export const persistor = persistStore(store);

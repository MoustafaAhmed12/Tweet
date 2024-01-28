import { configureStore } from "@reduxjs/toolkit";
import post from "./postSlice";
import user from "./userSlice";
import { apiPostSlice } from "./apiPostSlice";

const store = configureStore({
  reducer: {
    user,
    post,
    [apiPostSlice.reducerPath]: apiPostSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiPostSlice.middleware),
});

export default store;

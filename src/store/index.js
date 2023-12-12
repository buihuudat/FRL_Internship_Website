import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slice/userSlice";
import { authApi } from "../api/user/authApi";
import { userApi } from "../api/user/userApi";
import jobSlice from "../slice/jobSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,

    user: userSlice,
    job: jobSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, userApi.middleware),
});

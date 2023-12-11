import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slice/userSlice";
import { authApi } from "../api/user/authApi";
import { userApi } from "../api/user/userApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,

    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, userApi.middleware),
});

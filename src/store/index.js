import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slice/userSlice";
import { authApi } from "../api/user/authApi";
import { userApi } from "../api/user/userApi";
import jobSlice from "../slice/jobSlice";
import { adminApi } from "../api/admin/adminApi";
import companySlice from "../slice/companySlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,

    user: userSlice,
    job: jobSlice,
    company: companySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      adminApi.middleware
    ),
});

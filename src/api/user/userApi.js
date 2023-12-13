import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://internship-gpdp.onrender.com/api/v1/user",
    // baseUrl: "http://localhost:5000/api/v1/user",
    prepareHeaders: async (headers) => {
      const token = sessionStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    },
  }),
  endpoints: (builder) => ({
    checkAuth: builder.mutation({
      query: () => ({
        url: "/check-auth",
        method: "POST",
      }),
    }),
  }),
});

export const { useCheckAuthMutation } = userApi;

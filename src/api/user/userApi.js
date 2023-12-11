import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/user",

    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token;
      if (token) {
        console.log(token);
        headers.set("Authorization", `Bearer ${token}`);
      }
    },
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (username) => ({
        url: `/get-user/${username}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserQuery } = userApi;

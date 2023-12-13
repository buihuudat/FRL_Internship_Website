import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:5000/api/v1/admin",
    // baseUrl: "https://internship-gpdp.onrender.com/api/v1/admin",
    prepareHeaders: async (headers) => {
      const token = sessionStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    },
  }),

  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
    }),
    getJobs: builder.query({
      query: () => "/jobs",
    }),
    getCompany: builder.query({
      query: () => "/company",
    }),

    createJob: builder.mutation({
      query: (job) => ({
        url: "/jobs",
        method: "POST",
        body: job,
      }),
    }),
    createCompany: builder.mutation({
      query: (job) => ({
        url: "/jobs",
        method: "POST",
        body: job,
      }),
    }),
  }),
});

export const { useGetCompanyQuery, useGetUsersQuery, useGetJobsQuery } =
  adminApi;

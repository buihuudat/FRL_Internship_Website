import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:5000/api/v1/admin",
    baseUrl: "https://internship-gpdp.onrender.com/api/v1/admin",
    prepareHeaders: async (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    },
  }),
  tagTypes: ["jobs, company, companyJob, users"],

  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["users"],
    }),
    getJobs: builder.query({
      query: () => "/jobs",
      providesTags: ["jobs"],
    }),
    getCompany: builder.query({
      query: () => "/company",
      providesTags: ["company"],
    }),

    createJob: builder.mutation({
      query: (job) => ({
        url: "/jobs",
        method: "POST",
        body: job,
      }),
      invalidatesTags: ["jobs"],
    }),
    createCompany: builder.mutation({
      query: (company) => ({
        url: "/company",
        method: "POST",
        body: company,
      }),
      invalidatesTags: ["company"],
    }),

    getCompanyDetails: builder.query({
      query: (id) => ({
        url: `/company/${id}`,
      }),
      invalidatesTags: [{ type: "company" }],
    }),

    getCompanyJobs: builder.query({
      query: ({ id }) => ({
        url: `/company/${id}/jobs`,
      }),
      providesTags: [{ type: "companyJob" }],
    }),

    deleteCompany: builder.mutation({
      query: (id) => ({
        url: `/company/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["company"],
    }),
    deleteJob: builder.mutation({
      query: (id) => ({
        url: `/jobs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["jobs", "companyJob"],
    }),
    updateJob: builder.mutation({
      query: ({ id, job }) => ({
        url: `/jobs/${id}`,
        method: "PUT",
        body: job,
      }),
      invalidatesTags: ["jobs"],
    }),
    updateCompany: builder.mutation({
      query: ({ id, company }) => ({
        url: `/company/${id}`,
        method: "PUT",
        body: company,
      }),
      invalidatesTags: ["company"],
    }),
    updateUser: builder.mutation({
      query: (user) => ({
        url: `/${user.username}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useGetCompanyQuery,
  useGetUsersQuery,
  useGetJobsQuery,
  useCreateJobMutation,
  useCreateCompanyMutation,
  useGetCompanyDetailsQuery,
  useDeleteCompanyMutation,
  useDeleteJobMutation,
  useUpdateJobMutation,
  useUpdateCompanyMutation,
  useGetCompanyJobsQuery,
  useUpdateUserMutation,
} = adminApi;

import axiosClient from "./axiosClient";

export const userApi = {
  getUsers: () => axiosClient.get("user"),
  getUserById: (userId) => axiosClient.get(`user/${userId}`),
  updateUserById: (user) => axiosClient.put(`user/${user._id}`, user),
  jobApply: (data) => axiosClient.post("user/apply", data),
  getCVapplied: (userId) => axiosClient.get(`user/${userId}/cv-applied`),
  getJobsApplied: () => axiosClient.get(`user/jobs-applied`),
};

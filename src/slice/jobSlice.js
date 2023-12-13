import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  modal: {
    show: false,
    data: null,
  },
  notificationModal: {
    show: false,
  },
  createModal: {
    show: false,
    data: null,
  },
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.modal = action.payload;
    },
    notificationModal: (state, action) => {
      state.notificationModal = action.payload;
    },
    setJobs: (state, action) => {
      state.jobs = action.payload;
    },
    setCreateModal: (state, action) => {
      state.createModal = action.payload;
    },
  },
});

export const { showModal, notificationModal, setCreateModal } =
  jobSlice.actions;
export default jobSlice.reducer;

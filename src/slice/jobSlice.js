import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modal: {
    show: false,
    data: null,
  },
  notificationModal: {
    show: false,
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
  },
});

export const { showModal, notificationModal } = jobSlice.actions;
export default jobSlice.reducer;

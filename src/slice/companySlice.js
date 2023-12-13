import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  company: [],
  modal: {
    show: false,
    data: null,
  },
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompany: (state, action) => {
      state.company = action.payload;
    },
    setModal: (state, action) => {
      state.modal = action.payload;
    },
  },
});

export const { setCompany, setModal } = companySlice.actions;
export default companySlice.reducer;

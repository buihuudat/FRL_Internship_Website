import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  users: [],
  modal: {
    show: false,
    data: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setModal: (state, action) => {
      state.modal = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { setUser, setModal } = userSlice.actions;

export default userSlice.reducer;

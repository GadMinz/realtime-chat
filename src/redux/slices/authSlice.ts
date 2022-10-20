import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types";

type authState = {
  currentUser: User | null;
};

const initialState: authState = {
  currentUser: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.currentUser = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types";

type Chat = {
  chatId: string;
  user: User;
};

const initialState: Chat = {
  chatId: "null",
  user: {},
};

type TChangeUser = {
  user: User;
  chatId: "";
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    changeUser(state, action: PayloadAction<TChangeUser>) {
      state.user = action.payload.user;
      state.chatId = action.payload.chatId;
    },
  },
});

export const { changeUser } = chatSlice.actions;

export default chatSlice.reducer;

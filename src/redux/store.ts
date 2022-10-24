import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/authSlice";
import chat from "./slices/chatSlice";

const store = configureStore({
  reducer: {
    auth,
    chat
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

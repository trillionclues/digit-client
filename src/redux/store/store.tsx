import { configureStore } from "@reduxjs/toolkit";
import mobileToggleReducer from "@/redux/features/toggleSlice";
import authReducer from "../features/authSlice";

export const store = configureStore({
  reducer: {
    toggle: mobileToggleReducer,
    authentication: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

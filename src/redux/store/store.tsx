import { configureStore } from "@reduxjs/toolkit";
import mobileToggleReducer from "@/redux/features/toggleSlice";
import forgotPasswordReducer from "../features/forgotPasswordSlice";
import authReducer from "../features/authSlice";

export const store = configureStore({
  reducer: {
    toggle: mobileToggleReducer,
    authentication: authReducer,
    forgotPassword: forgotPasswordReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

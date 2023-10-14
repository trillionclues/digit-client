import { configureStore } from "@reduxjs/toolkit";
import mobileToggleReducer from "@/redux/features/toggleSlice";

export const store = configureStore({
    reducer: {
        toggle: mobileToggleReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
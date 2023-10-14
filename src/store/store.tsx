import { configureStore } from "@reduxjs/toolkit";
import mobileMenuReducer from "@/features/toggleSlice";

const store = configureStore({
    reducer: {
        mobileMenu: mobileMenuReducer,
    }
})

export default store
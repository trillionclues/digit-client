// mobileMenuSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

const mobileMenuSlice = createSlice({
  name: "toggle",
  initialState: false, // Initial state (e.g., mobile menu is closed)
  reducers: {
    toggleMenu: (state) => !state,
  },
});

export const { toggleMenu } = mobileMenuSlice.actions;

export default mobileMenuSlice.reducer;

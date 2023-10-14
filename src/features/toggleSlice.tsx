// mobileMenuSlice.js

import { createSlice } from "@reduxjs/toolkit";

const mobileMenuSlice = createSlice({
  name: "mobileMenu",
  initialState: false, // Initial state (e.g., mobile menu is closed)
  reducers: {
    openMenu: (state) => true,
    closeMenu: (state) => false,
    toggleMenu: (state) => !state,
  },
});

export const { openMenu, closeMenu, toggleMenu } = mobileMenuSlice.actions;

export default mobileMenuSlice.reducer;

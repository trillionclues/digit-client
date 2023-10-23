import {
  Middleware,
  MiddlewareAPI,
  Dispatch,
  AnyAction,
} from "@reduxjs/toolkit";

export const saveStateToLocalStorage: Middleware =
  (storeAPI: MiddlewareAPI) =>
  (next: Dispatch<AnyAction>) =>
  (action: AnyAction) => {
    if (typeof window !== "undefined") {
      // Check if you're on the client (browser) side
      try {
        const state = storeAPI.getState();
        const serializedState = JSON.stringify(state);
        localStorage.setItem("reduxState", serializedState);
      } catch (error) {
        console.error("Error saving state to local storage:", error);
      }
    }

    return next(action);
  };

export const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Error loading state from local storage:", error);
    return undefined;
  }
};

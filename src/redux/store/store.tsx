import { combineReducers, configureStore } from "@reduxjs/toolkit";
import mobileToggleReducer from "@/redux/features/toggleSlice";
import forgotPasswordReducer from "../features/forgotPasswordSlice";
import authReducer from "../features/authSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  toggle: mobileToggleReducer,
  authentication: authReducer,
  forgotPassword: forgotPasswordReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: true,
    });
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// add persistor
export const persistor = persistStore(store);

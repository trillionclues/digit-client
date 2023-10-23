import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "@/constants/dbUrl";
import { NewUserType } from "@/types/NewUserType";
import { handleLogin, iLogin } from "@/app/login/login.service";

interface AuthAction {
  token: string | null;
  user: any;
  isLoading: boolean;
  error: any | { message: string; statusCode?: number };
}

const initialState: AuthAction = {
  token: null,
  user: null,
  isLoading: false,
  error: false,
};

export const LoginSlice = createAsyncThunk(
  "auth/login",
  async (credentials: iLogin, { dispatch }) => {
    try {
      const response = await handleLogin(credentials);
      dispatch(setToken(response.token));
      return response.token;
    } catch (error: any) {
      return error.message;
    }
  }
);

// sign up slice
export const SignUpSlice = createAsyncThunk(
  "auth/register",
  async (newUserData: NewUserType, thunkAPI) => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/user/register`,
        newUserData
      );
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
      throw err;
    }
  }
);

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<any>) => {
      // set token
      localStorage.setItem("token", JSON.stringify(action.payload));
      state.token = action.payload;
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    clearAuth: (state) => {
      state.token = null;
      state.user = null;
    },
    updateUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(LoginSlice.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(LoginSlice.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload;
    });
    builder.addCase(LoginSlice.rejected, (state, action) => {
      // console.log(action);
      state.isLoading = false;
    });
    builder.addCase(SignUpSlice.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(SignUpSlice.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(SignUpSlice.rejected, (state, action) => {
      state.isLoading = false;
      state.error =
        typeof action.error === "object" ? action.error?.message : "";
    });
  },
});

export const { setToken, clearAuth, setUser, updateUser } = authSlice.actions;
export default authSlice.reducer;

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "@/constants/dbUrl";
import { NewUserType } from "@/types/NewUserType";
import { handleLogin, iLogin } from "@/app/login/login.service";

interface AuthAction {
  token: string | null;
  user: any;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: any | { message: string; statusCode?: number };
}

const initialState: AuthAction = {
  token: null,
  user: null,
  isLoading: false,
  error: false,
  isAuthenticated: false,
};

export const LoginSlice = createAsyncThunk(
  "auth/login",
  async (credentials: iLogin, { dispatch }) => {
    try {
      const response = await handleLogin(credentials);
      // dispatch(setToken(response.token));
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
    updateUserAuthStatus: (state, action: PayloadAction<any>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.token = action.payload.token;
    },
    updateToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
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
      state.error = null;
    });
    builder.addCase(SignUpSlice.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
      authSlice.caseReducers.updateToken(state, action.payload.token);
    });
    builder.addCase(SignUpSlice.rejected, (state, action) => {
      state.isLoading = false;
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.error = action.payload || { message: "Sign-up failed" };
    });
  },
});

// export actions
export const { updateUserAuthStatus, updateToken } = authSlice.actions;
export default authSlice.reducer;

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "@/constants/dbUrl";
import { NewUserType } from "@/types/NewUserType";

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

export const authAsync = createAsyncThunk(
  "auth",
  async (token: string, thunkAPI) => {
    try {
      // console.log("login");
      return token;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
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
    login: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      (state.token = null), (state.user = null);
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(authAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload;
    });
    builder.addCase(authAsync.rejected, (state, action) => {
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

export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;

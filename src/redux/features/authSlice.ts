import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthAction {
  token: string | null;
  user: any;
  isLoading: boolean;
}

const initialState: AuthAction = {
  token: null,
  user: null,
  isLoading: false,
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
  },
});

export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;

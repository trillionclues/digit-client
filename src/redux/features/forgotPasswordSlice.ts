import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "@/constants/dbUrl";

type changePasswordProps = {
  token: string | string[] | undefined;
  newPassword: string;
};

const initialState = {
  email: "",
  submitting: false,
  error: null as string | null,
  emailSent: false,
  newUserPassword: false,
};

// send password reset token
export const sendForgotPasswordToken = createAsyncThunk(
  "auth/forgotPasswordToken",
  async (email: string) => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/user/forgot-password-token`,
        {
          email,
        }
      );
      return response.data; // confirmation
    } catch (error) {
      throw new Error("Failed to send password reset token!");
    }
  }
);

// change and set password
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ newPassword }: changePasswordProps) => {
    try {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const token = urlSearchParams.get("token");
      const response = await axios.put(
        `${baseUrl}/api/user/reset-password/${token}`,
        {
          password: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data; //confirm
    } catch (error) {
      // console.log(error);
      throw new Error("Failed to change password!");
    }
  }
);

const passwordResetSlice = createSlice({
  name: "passwordReset",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendForgotPasswordToken.pending, (state) => {
      state.submitting = true;
      state.emailSent = false;
      state.error = null;
    });
    builder.addCase(sendForgotPasswordToken.fulfilled, (state) => {
      state.submitting = false;
      state.emailSent = true;
    });
    builder.addCase(sendForgotPasswordToken.rejected, (state, action) => {
      state.submitting = false;
      state.emailSent = false;
      state.error = (action.error.message ?? null) as string | null;
    });
    builder.addCase(changePassword.pending, (state) => {
      state.newUserPassword = false;
      state.submitting = true;
      state.error = null;
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.newUserPassword = true;
      state.submitting = false;
    });
    builder.addCase(changePassword.rejected, (state, action) => {
      state.submitting = false;
      state.newUserPassword = false;
      state.error = (action.error.message ?? null) as string | null;
    });
  },
});

export const { setEmail } = passwordResetSlice.actions;
export default passwordResetSlice.reducer;

"use client";
import React, { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import LogoHeader from "@/components/reusables/LogoHeader";
import { AppDispatch, RootState } from "@/redux/store/store";
import { changePassword } from "@/redux/features/forgotPasswordSlice";
// import { TokenProps } from "@/types/TokenProps";

const page = () => {
  const forgotPasswordState = useSelector(
    (state: RootState) => state.forgotPassword
  );
  const { submitting, error, newUserPassword } = forgotPasswordState;
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(submitting);
  // const [isValidToken, setIsValidToken] = useState(false);
  const [formError, setFormError] = useState<string | null>(error);
  const [newPassword, setNewPassword] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const validationSchema = z.object({
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPasswordValue = e.target.value;
    setNewPassword(newPasswordValue);
  };

  // get token from params
  const token = searchParams.get("token");

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoadingSubmit(true);
    setFormError(error ? error : null);

    try {
      const dataToValidate = { password: newPassword };
      // console.log("Data to Validate:", dataToValidate);
      validationSchema.parse(dataToValidate);
      if (token) {
        const resultAction = await dispatch(
          changePassword({ newPassword: newPassword, token: token })
        );
        // userPassword is the new password and userToken is token signed
        if (changePassword.fulfilled.match(resultAction)) {
          setNewPassword("");
          router.push("/login");
        }
      } else {
        throw Error("Invalid URL parameters");
      }
    } catch (error) {
      // console.log("Failed to change password", error);
      if (error instanceof z.ZodError) {
        setFormError(error.issues[0].message);
      }
      setIsLoadingSubmit(false);
    } finally {
      setIsLoadingSubmit(false);
    }
  };

  ////////////////////TOKEN VALIDITY ON SERVER
  //   check if token expired
  // const isTokenExpired = (token: TokenProps | null) => {
  //   if (token) {
  //     const expirationTime = new Date(token.passwordResetExpires).getTime();
  //     const currentTime = new Date().getTime();
  //     return expirationTime < currentTime;
  //   }
  //   return false;
  // };

  // //   check if the token is valid
  // const isTokenValid = async (token: TokenProps | null) => {
  //   if (token) {
  //     const { resetToken } = token;

  //     // Web Platform API for encoding  JS string
  //     const textEncoder = new TextEncoder();
  //     const encodedData = textEncoder.encode(resetToken);

  //     // Web Crypto API to calculate hash - returns Promise
  //     const hashBuffer = await crypto.subtle.digest("SHA-256", encodedData);
  //     const hashedToken = Array.from(new Uint8Array(hashBuffer))
  //       .map((byte) => byte.toString(16).padStart(2, "0"))
  //       .join("");
  //     // compare calculated hashedToken to  passwordResetToken
  //     return hashedToken === token.passwordResetToken;
  //   }
  //   return false;
  // };

  // useEffect(() => {
  //   if (token) {
  //     let tokenProps: TokenProps | null = null;
  //     // const tokenProps = token as unknown as TokenProps;

  //     try {
  //       // parse as TokenProps
  //       tokenProps = JSON.parse(token);
  //     } catch (error) {
  //       // not a valid TokenProps
  //       tokenProps = null;
  //     }

  //     // if (tokenProps) {
  //     //   // Token is a valid TokenProps
  //     //   const expired = isTokenExpired(tokenProps);
  //     //   const valid = isTokenValid(tokenProps);

  //     //   if (expired || !valid) {
  //     //     // Token is either expired or invalid
  //     //     setIsValidToken(false);
  //     //   } else {
  //     //     // Token is valid
  //     //     setIsValidToken(true);
  //     //   }
  //     // } else {
  //     //   // Token is not a valid TokenProps
  //     //   setIsValidToken(false);
  //     // }

  // }, [token]);

  // if (!isValidToken) {
  //   return (
  //     <div className="flex flex-col items-center justify-center h-full mt-8">
  //       <LogoHeader
  //         headerText="Something went wrong!"
  //         paraText="Invalid or expired token. Please request a new link."
  //         className="text-sm font-medium text-[#072F5F] text-center w-9/12 md:w-1/4"
  //       />
  //       <Link href="/forgot-password">
  //         <button
  //           type="submit"
  //           className="bg-[#072F5F] cursor-pointer hover:bg-teal text-white text-sm font-bold py-3 mt-5 w-full px-4 rounded-full focus:outline-none"
  //         >
  //           <div className="flex flex-row justify-center items-center gap-2">
  //             Forgot Password <FiArrowRight className="font-medium text-lg" />
  //           </div>
  //         </button>
  //       </Link>
  //     </div>
  //   );
  // }

  return (
    <div className="flex flex-col items-center justify-center h-full mt-8">
      <LogoHeader
        headerText="Change Your Password"
        paraText="Enter your new password and we will get you into your account immediatly"
        className="text-sm font-medium text-[#072F5F] text-center w-9/12 md:w-1/4"
      />
      <form
        method="PUT"
        onSubmit={handleChangePassword}
        className="w-full max-w-sm md:max-w-md mt-8 bg-white rounded
    px-6 pt-6 pb-8 mb-4 shadow-md"
      >
        <div className="flex flex-col justify-start items-start">
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-600 pb-1"
          >
            New Password
          </label>
          <div className="text-red-500 text-sm py-2">{formError}</div>
          <input
            type="password"
            name="newPassword"
            onChange={handleChange}
            className="border text-sm border-grey-light w-full p-3 rounded-full mb-4 valid:border-green-500 focus:ring-0 or focus:ring-transparent outline-none"
            placeholder="Enter your email"
            required
          />
        </div>
        <hr className="flex-grow w-full" />
        <button
          type="submit"
          className={`${
            isLoadingSubmit
              ? "bg-gray-600 hover:bg-indigo cursor-not-allowed loading"
              : "bg-[#072F5F] cursor-pointer hover:bg-teal"
          } text-white text-sm font-bold py-3 mt-5 w-full px-4 rounded-full focus:outline-none`}
          disabled={isLoadingSubmit}
        >
          {isLoadingSubmit ? (
            <div className="spinner mx-auto"></div>
          ) : (
            <div className="flex flex-row justify-center items-center gap-2">
              Submit <FiArrowRight className="font-medium text-lg" />
            </div>
          )}
        </button>
      </form>
    </div>
  );
};

export default page;

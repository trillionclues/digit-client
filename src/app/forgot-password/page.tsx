"use client";
import { sendForgotPasswordToken } from "@/redux/features/forgotPasswordSlice";
import CheckEmailNotification from "@/components/Password/CheckEmailNotification";
import LogoHeader from "@/components/reusables/LogoHeader";
import { AppDispatch, RootState } from "@/redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { FiArrowRight } from "react-icons/fi";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";

const page = () => {
  const forgotPasswordState = useSelector(
    (state: RootState) => state.forgotPassword
  );
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { submitting, error, emailSent } = forgotPasswordState;
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(submitting);

  const [formError, setFormError] = useState<string | null>(error);
  const [userEmail, setUserEmail] = useState<string>("");
  const [userTyping, setUserTyping] = useState(false);

  const validationSchema = z.object({
    email: z.string().email("Invalid email address"),
  });

  // handle onchange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
  };

  const handleForgotPasswordToken = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setIsLoadingSubmit(true);
    setFormError(null);

    try {
      const dataToValidate = { email: userEmail };
      validationSchema.parse(dataToValidate);
      const resultAction = await dispatch(sendForgotPasswordToken(userEmail));
      if (sendForgotPasswordToken.fulfilled.match(resultAction)) {
        setUserEmail("");
        // router.push("/change-password");
      }
    } catch (error) {
      console.log("Failed to send reset token", error);
      if (error instanceof z.ZodError) {
        setFormError(error.issues[0].message);
      }
      setIsLoadingSubmit(false);
    } finally {
      setIsLoadingSubmit(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full mt-8">
      {emailSent ? (
        <>
          <LogoHeader
            headerText="Check Your Email!"
            paraText="We've sent a reset link to your email. Please check your inbox and
        follow the instructions to reset your password."
            className="text-sm font-medium text-[#072F5F] text-center w-9/12 md:w-1/4"
          />
          <CheckEmailNotification userEmail={userEmail} />
        </>
      ) : (
        <>
          <LogoHeader
            headerText="Recover Your Password"
            paraText="Forgotten your password? Enter the email linked to your account and we’ll send you a reset link"
            className="text-sm font-medium text-[#072F5F] text-center w-9/12 md:w-1/4"
          />

          <form
            method="POST"
            onSubmit={handleForgotPasswordToken}
            className="w-full max-w-sm md:max-w-md mt-8 bg-white rounded
          px-6 pt-6 pb-8 mb-4 shadow-md"
          >
            <div className="flex flex-col justify-start items-start">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600 pb-1"
              >
                Email
              </label>
              <div className="text-red-500 text-sm py-2">{formError}</div>
              <input
                type="text"
                name="email"
                className="border text-sm border-grey-light w-full p-3 rounded-full mb-4 valid:border-green-500 focus:ring-0 or focus:ring-transparent outline-none"
                placeholder="Enter your email"
                value={userEmail}
                onChange={handleChange}
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
        </>
      )}
      <p className="mt-4 text-[#072F5F] text-[16px]">
        Don't have an account?{" "}
        <Link href="/login" className="text-blue-500">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default page;

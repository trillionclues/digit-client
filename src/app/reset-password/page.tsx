"use client";
import React, { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { z } from "zod";
import LogoHeader from "@/components/reusables/LogoHeader";
import { AppDispatch, RootState } from "@/redux/store/store";
import { changePassword } from "@/redux/features/forgotPasswordSlice";

const page = () => {
  const forgotPasswordState = useSelector(
    (state: RootState) => state.forgotPassword
  );
  const { submitting, error } = forgotPasswordState;
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(submitting);
  const [formError, setFormError] = useState<string | null>(error);
  const [newPassword, setNewPassword] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const validationSchema = z.object({
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  //   retrive token from query params
  // const token = searchParams.get("token");
  // console.log(token);
  const token = searchParams.get("token");
  console.log(token);
  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoadingSubmit(true);
    setFormError(null);

    try {
      const dataToValidate = { password: newPassword };
      validationSchema.parse(dataToValidate);
      if (token) {
        const resultAction = await dispatch(
          changePassword({ newPassword: newPassword, token: token })
        );
        // userPassword is the new password and userToken is the token received
      } else {
        // cons
      }

      router.push("/");
    } catch (error) {
      console.log("Failed to change password", error);
      if (error instanceof z.ZodError) {
        setFormError(error.issues[0].message);
      }
      setIsLoadingSubmit(false);
    } finally {
      setIsLoadingSubmit(false);
    }
  };

  useEffect(() => {
    // If you want to check if the token is present or perform any other logic, you can do so here.
    if (!token) {
      // Handle the case where the token is not available in the URL.
      // You can redirect the user to an error page or take other actions.
    }
  }, [token]);

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
              ? "bg-blue hover:bg-indigo cursor-not-allowed loading"
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

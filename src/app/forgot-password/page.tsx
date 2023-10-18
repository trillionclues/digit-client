"use client";
import LogoHeader from "@/components/reusables/LogoHeader";
import { FiArrowRight } from "react-icons/fi";
import React, { useState } from "react";
import Link from "next/link";

const page = () => {
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-full mt-8">
      <LogoHeader
        headerText="Recover Your Password"
        paraText="Forgotten your password? Enter email linked to your account and we’ll send a password reset link"
        className="text-sm font-medium text-[#072F5F] text-center w-9/12 md:w-1/4"
      />
      <form
        method="POST"
        // onSubmit={handleFormLogin}
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
          <div className="text-red-500 text-sm py-2">
            {/* {formErrors.email} */}
          </div>
          <input
            type="text"
            name="email"
            className="border text-sm border-grey-light w-full p-3 rounded-full mb-4 valid:border-green-500 focus:ring-0 or focus:ring-transparent outline-none"
            placeholder="Enter your email"
            // value={formData?.email}
            // onChange={handleChange}
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
      <p className="mt-4 text-[#072F5F] text-[16px]">
        Don't have an account?{" "}
        <Link href="/signup" className="text-blue-500">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default page;

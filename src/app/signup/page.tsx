"use client";
import LogoHeader from "@/components/reusables/LogoHeader";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FiArrowRight } from "react-icons/fi";
import { useState, useEffect } from "react";
import Link from "next/link";
import React from "react";

const SignupPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full mt-8">
      <LogoHeader
        headerText="Sign Up for SOFANA"
        paraText="Create your account by filling in the details below"
        className="text-sm font-medium text-[#072F5F]"
      />
      <form
        method="POST"
        className="w-full max-w-sm md:max-w-2xl mt-8 bg-white rounded px-6 pt-6 pb-8 mb-4 shadow-md"
      >
        {/* // onSubmit={} */}
        {/* First Name and Last Name */}
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="w-full md:w-1/2 pr-2">
            <label
              htmlFor="firstname"
              className="block text-sm font-medium text-gray-600 pb-1"
            >
              First Name
            </label>
            <div className="text-red-500 text-sm py-2">
              {/* {formErrors.firstname} */}
            </div>
            <input
              type="text"
              name="firstname"
              className="border text-sm border-grey-light w-full p-3 rounded-full mb-4"
              placeholder="Enter your email"
              // value={formData?.firstname}
              // onChange={handleChange}
              required
            />
          </div>
          <div className="w-full md:w-1/2 pl-2">
            <label
              htmlFor="lastname"
              className="block text-sm font-medium text-gray-600 pb-1"
            >
              Last Name
            </label>
            <div className="text-red-500 text-sm py-2">
              {/* {formErrors.lastname} */}
            </div>
            <input
              type="text"
              name="lastname"
              className="border text-sm border-grey-light w-full p-3 rounded-full mb-4"
              placeholder="Enter your last name"
              // value={formData?.lastname}
              // onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="w-full md:w-1/2 pr-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 pb-1"
            >
              Email
            </label>
            <div className="text-red-500 text-sm py-2">
              <input
                type="text"
                name="email"
                className="border text-sm border-grey-light w-full p-3 rounded-full mb-4"
                placeholder="Enter your email"
                // value={formData?.email}
                // onChange={handleChange}
                required
              />
            </div>
            {/* Input field for Email */}
          </div>
          <div className="w-full md:w-1/2 pl-2">
            <label
              htmlFor="mobile"
              className="block text-sm font-medium text-gray-600 pb-1"
            >
              Phone Number
            </label>
            <div className="text-red-500 text-sm py-2">
              {/* {formErrors.mobile} */}
            </div>
            <input
              type="text"
              name="mobile"
              className="border text-sm border-grey-light w-full p-3 rounded-full mb-4"
              placeholder="Enter your phone number"
              // value={formData?.mobile}
              // onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="flex flex-col items-start relative rounded-full mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600 pb-1"
          >
            Password
          </label>
          <div className="text-red-500 text-sm py-2">
            {/* {formErrors.password} */}
          </div>
          <input
            type={passwordVisible ? "text" : "password"}
            name="password"
            className="border text-sm border-grey-light w-full p-3 rounded-full pr-12"
            placeholder="Enter your password"
            // value={formData?.password}
            // onChange={handleChange}
            required
          />
          <div className="relative">
            <button
              type="button"
              className="absolute -top-[90px] md:-top-[105px] left-72 md:left-[580px] mt-[55px] md:mt-[73px] mr-4"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? (
                <BsEyeSlash className="text-xl" />
              ) : (
                <BsEye className="text-xl" />
              )}
            </button>
          </div>
        </div>
        <hr className="flex-grow w-full py-2 w-full" />
        <button
          type="submit"
          className={`${
            isSignUp
              ? "bg-blue hover:bg-indigo cursor-not-allowed loading"
              : "bg-[#072F5F] cursor-pointer hover:bg-teal"
          } text-white text-sm font-bold py-3 w-full px-4 rounded-full focus:outline-none`}
          disabled={isSignUp}
        >
          {isSignUp ? (
            <div className="spinner mx-auto"></div>
          ) : (
            <div className="flex flex-row justify-center items-center gap-2">
              Register <FiArrowRight className="font-medium text-lg" />
            </div>
          )}
        </button>
      </form>
      <div className="w-full max-w-sm md:max-w-2xl px-6 mt-2 pb-5 text-center flex flex-col justify-center items-center gap-1">
        <p>By clicking sign up, you accept Sofan’s Terms of service</p>
        <p>
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;

"use client";
import { handleLogin, iLogin } from "@/app/login/login.service";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FiArrowRight } from "react-icons/fi";
import { authAsync } from "@/redux/features/authSlice";
import { AppDispatch } from "@/redux/store/store";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface AuthFormProps {
  onSubmit: (formdata: any) => void;
  isLoading: boolean;
  isSignUp?: boolean;
}

interface inputData {
  email?: string | undefined;
  password?: string | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  phoneNumber?: string | undefined;
  address?: string | undefined;
}

const AuthForm: React.FC<AuthFormProps> = ({
  onSubmit,
  isLoading,
  isSignUp,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  let token: string;

  // handle onchange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle rememeber me checkbox
  const handleRememberMe = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };

  // handle visibility toggle
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    const storedPassword = localStorage.getItem("rememberedPassword");

    if (storedEmail && storedPassword && rememberMe) {
      setFormData((prevState) => ({
        ...prevState,
        email: storedEmail,
        password: storedPassword,
      }));
    }
  }, [rememberMe]);
  return (
    <form
      onSubmit={() => onSubmit(formData)}
      className="w-full max-w-sm md:max-w-md mt-8 bg-white rounded px-6 pt-6 pb-8 mb-4 shadow-md"
    >
      {isSignUp && (
        <div className="mb-4">
          {/* Additional fields for sign-up */}
          <label
            htmlFor="firstname"
            className="block text-sm font-medium text-gray-600 pb-1"
          >
            First Name
          </label>
          <input
            type="text"
            name="firstname"
            className="border text-sm border-grey-light w-full p-3 rounded-full mb-4"
            placeholder="Enter first name..."
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
      )}

      {isSignUp && (
        <div className="mb-4">
          {/* Additional fields for sign-up */}
          <label
            htmlFor="lastname"
            className="block text-sm font-medium text-gray-600 pb-1"
          >
            Last Name
          </label>
          <input
            type="text"
            name="lastname"
            className="border text-sm border-grey-light w-full p-3 rounded-full mb-4"
            placeholder="Enter last name..."
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
      )}

      {isSignUp && (
        <div className="mb-4">
          {/* Additional fields for sign-up */}
          <label
            htmlFor="mobile"
            className="block text-sm font-medium text-gray-600 pb-1"
          >
            Phone Number
          </label>
          <input
            type="text"
            name="mobile"
            className="border text-sm border-grey-light w-full p-3 rounded-full mb-4"
            placeholder="Enter phone number..."
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
      )}

      <div className="flex flex-col justify-start items-start">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-600 pb-1"
        >
          Email
        </label>
        <input
          type="text"
          name="email"
          className="border text-sm border-grey-light w-full p-3 rounded-full mb-4"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="relative rounded-full mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-600 pb-1"
        >
          Password
        </label>
        <input
          type={passwordVisible ? "text" : "password"}
          name="password"
          className="border text-sm border-grey-light w-full p-3 rounded-full pr-12"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button
          type="button"
          className="absolute top-0 right-0 mt-[38px] mr-4"
          onClick={togglePasswordVisibility}
        >
          {passwordVisible ? (
            <BsEyeSlash className="text-xl" />
          ) : (
            <BsEye className="text-xl" />
          )}
        </button>
      </div>

      <div className="mb-4 flex justify-between">
        <label
          htmlFor="rememberMe"
          className="flex items-center text-sm font-medium text-gray-600"
        >
          <input
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            className="mr-2"
            checked={rememberMe}
            onChange={handleRememberMe}
          />
          Remember Me
        </label>
        {isSignUp ? (
          <Link //conditional
            href="/forgot-password"
            className="text-[#072F5F] text-sm font-medium"
          >
            Forgot password?
          </Link>
        ) : (
          <Link //conditional
            href="/login"
            className="text-[#072F5F] text-sm font-medium"
          >
            Already have an account?
          </Link>
        )}
      </div>

      <button
        type="submit"
        className={`${
          isLoading ? "bg-blue hover:bg-indigo" : "bg-[#072F5F] hover:bg-teal"
        } text-white text-sm font-bold py-3 w-full px-4 rounded-full focus:outline-none ${
          isLoading ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        disabled={isLoading}
      >
        {isLoading ? (
          "Processing..."
        ) : (
          <div className="flex flex-row justify-center items-center gap-2">
            {isSignUp ? "Sign Up" : "Sign In"}
            <FiArrowRight className="font-medium text-lg" />
          </div>
        )}
      </button>
    </form>
  );
};

export default AuthForm;

"use client";
import Link from "next/link";
import React from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FiArrowRight } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { authAsync } from "@/redux/features/authSlice";
import { handleLogin, iLogin } from "./login.service";
import { AppDispatch, RootState } from "@/redux/store/store";
import AuthForm from "@/components/reusables/authForm";
import { z } from "zod";

const Login = () => {
  const isLoading = useSelector(
    (state: RootState) => state.authentication.isLoading
  );
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(isLoading);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  let token: string;

  const validationSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

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

  // handle form submit
  const handleFormLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: iLogin = {
      email: formData?.email || "",
      password: formData?.password || "",
    };

    // if (!data.email || !data.password) {
    //   alert("Please enter all fields");
    //   return;
    // }

    // set remember me data
    if (rememberMe) {
      localStorage.setItem("rememberedEmail", data.email);
      localStorage.setItem("rememberedPassword", data.password);
    }

    try {
      setIsLoadingUser(true);
      validationSchema.parse(formData);
      const response = await handleLogin(data, token);
      const resultAction = await dispatch(authAsync(response.token));

      if (authAsync.fulfilled.match(resultAction)) {
        const token = resultAction.payload;
        localStorage.setItem("token", token);
        router.push("/");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.log("Login failed", error);
      if (error instanceof z.ZodError) {
        setFormErrors({
          email:
            error.issues.find((issue) => issue.path[0] === "email")?.message ||
            "",
          password:
            error.issues.find((issue) => issue.path[0] === "password")
              ?.message || "",
        });
      }
    } finally {
      setIsLoadingUser(false);
    }
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    const storedPassword = localStorage.getItem("rememberedPassword");

    if (storedEmail && storedPassword && rememberMe) {
      setFormData({ email: storedEmail, password: storedPassword });
    }
  }, [rememberMe]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col text-center justify-center items-center">
        <Link href="/">
          <h2 className="font-bold text-[#072F5F] text-2xl text-center">
            SOFANA
          </h2>
        </Link>
        <div className="brush-underline pl-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 10"
            width="100%"
            height="10"
          >
            <path
              d="M0 0 C 20 10 40 10 60 0"
              stroke="#000"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
      </div>

      {/* dynamic starts here */}
      {/* <AuthForm formConfig={formConfig.login} onSubmit={handleLogin}/> */}
      <h1 className="font-bold text-lg mt-5 text-[#072F5F]">
        Sign In to your SOFANA
      </h1>
      <p className="text-sm font-medium text-[#072F5F]">
        Enter your details to sign in to your account
      </p>
      <form
        method="POST"
        onSubmit={handleFormLogin}
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
          <div className="text-red-500 text-sm py-2">{formErrors.email}</div>
          <input
            type="text"
            name="email"
            className="border text-sm border-grey-light w-full p-3 rounded-full mb-4"
            placeholder="Enter your email"
            value={formData?.email}
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
            <div className="text-red-500 text-sm py-2">
              {formErrors.password}
            </div>
          </label>
          {/* <div className="text-red-500 text-sm py-2">{formErrors.password}</div> */}
          <input
            type={passwordVisible ? "text" : "password"}
            name="password"
            className="border text-sm border-grey-light w-full p-3 rounded-full pr-12"
            placeholder="Enter your password"
            value={formData?.password}
            onChange={handleChange}
            required
          />
          <div className="relative">
            <button
              type="button"
              className="absolute -top-[90px] md:-top-[105px] right-0 mt-[55px] md:mt-[73px] mr-4"
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
          <Link //conditional
            href="/forgot-password"
            className="text-[#072F5F] text-sm font-medium"
          >
            Forgot password?
          </Link>
        </div>
        <button
          type="submit"
          className={`${
            isLoading
              ? "bg-blue hover:bg-indigo cursor-not-allowed loading"
              : "bg-[#072F5F] cursor-pointer hover:bg-teal"
          } text-white text-sm font-bold py-3 w-full px-4 rounded-full focus:outline-none`}
          disabled={isLoadingUser}
        >
          {isLoadingUser ? (
            <div className="spinner mx-auto"></div>
          ) : (
            <div className="flex flex-row justify-center items-center gap-2">
              Sign In <FiArrowRight className="font-medium text-lg" />
            </div>
          )}
        </button>
      </form>
      {/* ends */}
      <p className="mt-4 text-[#072F5F] text-[16px]">
        Don't have an account? <Link href="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;

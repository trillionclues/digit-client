"use client";
import Link from "next/link";
import React from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FiArrowRight } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { handleLogin, iLogin } from "./login.service";
import { AppDispatch, RootState } from "@/redux/store/store";
import { z } from "zod";
import LogoHeader from "@/components/reusables/LogoHeader";
import { toast } from "react-toastify";

export const Login = () => {
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

  // check user auth
  // const withServerProps = useAuth()
  // const { isAuthenticated, token } = withServerProps

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
      // token: token,
    };

    // set remember me data
    if (rememberMe) {
      localStorage.setItem("rememberedEmail", data.email);
      localStorage.setItem("rememberedPassword", data.password);
    }

    try {
      setIsLoadingUser(true);
      validationSchema.parse(formData);
      const response = await handleLogin(data);
      // dispatch token to redux store
      // dispatch(setToken(response.token));
      // dispatch(setUser(response));
      // setCookie(res, "token", response.token);

      toast.success("Welcome back!", {
        position: "top-right",
        autoClose: 2000,
      });
      router.push("/dashboard");
    } catch (error) {
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
    <div className="flex flex-col items-center justify-center h-full mt-8">
      <LogoHeader
        headerText="Sign In to your SOFANA"
        paraText="Enter your details to sign in to your account"
        className="text-sm font-medium text-[#072F5F]"
      />

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

        <hr className="flex-grow w-full py-2 w-full" />
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
        Don't have an account?{" "}
        <Link href="/signup" className="text-blue-500">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;

"use client";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/redux/actions/authActions";
import { authAsync } from "@/redux/features/authSlice";
import { handleLogin, iLogin } from "./login.service";
import { AppDispatch, RootState } from "@/redux/store/store";

const Login = () => {
  const authState = useSelector((state: RootState) => state.authentication);
  const { isLoading } = useSelector((state: RootState) => state.authentication);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoadingUser, setIsLoadingUser] = useState(isLoading);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  let token: string;

  // handle onchange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: iLogin = {
      email: formData?.email || "",
      password: formData?.password || "",
    };

    // check if data entered is empty
    if (!data.email || !data.password) {
      alert("Please enter all fields");
      return;
    }

    try {
      const response = await handleLogin(data, token);
      setIsLoadingUser(true);
      // console.log("response", response);
      const resultAction = await dispatch(authAsync(response.token));

      if (authAsync.fulfilled.match(resultAction)) {
        // Use the result if needed
        const token = resultAction.payload;
        localStorage.setItem("token", token);
        alert("welcome back");
        router.push("/dashboard");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.log("Login failed", error);
    } finally {
      setIsLoadingUser(false);
    }
  };

  // useEffect(()=>{
  //   if(response.token){
  //     router.push(`/dashboard?token=${response.token}`)
  //   }
  // },[response.token])
  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen">
        <div className="md:w-1/2 px-10">
          <div className="flex flex-col justify-center items-start md:w-1/2 px-4 mb-8">
            <div className="logo-container pt-5">
              <Link href="/">
                <h2 className="font-bold">SOFANA</h2>
              </Link>
              <div className="brush-underline">
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
          </div>
          <h1 className="text-3xl font-semibold">Login to Your Account</h1>
          <form className="mt-4" onSubmit={handleFormLogin}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email Address:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-[50%] p-2 border rounded-md focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-500"
              />
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
                />
                Remember Me
              </label>
              <Link href="/forgot-password" className="text-blue-500">
                Forgot your password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md"
            >
              Submit
            </button>
          </form>
          <p className="mt-4">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-500">
              Sign up
            </Link>
          </p>
        </div>
        <div className="hidden md:w-1/2 md:flex">
          {/* Replace with your image or content */}
          <img
            src="/your-image.jpg"
            alt="Your Image"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </>
  );
};

export default Login;

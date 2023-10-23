"use client";
import LogoHeader from "@/components/reusables/LogoHeader";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FiArrowRight } from "react-icons/fi";
import { useState, useEffect } from "react";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { toast } from "react-toastify";
import { z } from "zod";
import { useRouter } from "next/navigation";
import authSlice, {
  SignUpSlice,
  updateUserAuthStatus,
} from "@/redux/features/authSlice";
import { getAuthToken } from "../../../utils/authUtills";

const SignupPage = () => {
  const userAuth = useSelector((state: RootState) => state.authentication);
  const { isLoading, user, error, token, isAuthenticated } = userAuth;
  const [isSignupUser, setIsSignupUser] = useState(isLoading);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formErrors, setFormErrors] = useState({
    firstname: null,
    lastname: null,
    email: null,
    mobile: null,
    password: null,
  });
  // const [newUser, setNewUser] = useState(user);
  const [userForm, setUserForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    password: "",
  });
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  if (!isAuthenticated) {
    router.push("/login");
  }

  // new user validation
  const validationSchema = z.object({
    firstname: z
      .string()
      .min(2, { message: "First name must be at least 2 characters" }),
    lastname: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters" }),
    email: z.string().email("Invalid email address"),
    mobile: z
      .string()
      .min(10, { message: "Phone number must be at least 10 characters" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!validationSchema.parseAsync) return;
    const { name, value } = e.target;
    setUserForm({ ...userForm, [name]: value });
  };

  const clearFormErrors = () => {
    setFormErrors({
      firstname: null,
      lastname: null,
      email: null,
      mobile: null,
      password: null,
    });
  };

  const handleCreateNewUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearFormErrors();
    dispatch(
      updateUserAuthStatus({
        isAuthenticated: true,
        token,
      })
    );

    try {
      setIsSignupUser(true);
      // construct user data
      const newUserData = {
        firstname: userForm?.email,
        lastname: userForm?.lastname,
        email: userForm?.email,
        mobile: userForm?.mobile,
        password: userForm?.password,
      };

      await validationSchema.parseAsync(userForm);
      const resultAction = await dispatch(SignUpSlice(newUserData));

      // error creatig user
      if (!resultAction || !resultAction.payload) {
        throw Error("Failed to create a new User");
      }

      if (SignUpSlice.fulfilled.match(resultAction)) {
        toast.success("Account created successfully!", {
          position: "top-right",
          autoClose: 2000,
        });
        router.push("/login");
      } else if (SignUpSlice.rejected.match(resultAction)) {
        const error = resultAction.payload;
        console.error("Sign-up failed:", error);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.issues.forEach((issue) => {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            [issue.path[0]]: issue.message,
          }));
        });
      }
      console.error("An error occurred during sign-up:", error);
      setIsSignupUser(false);
    } finally {
      setIsSignupUser(false);
    }
  };
  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-full mt-8">
      <LogoHeader
        headerText="Sign Up for SOFANA"
        paraText="Create your account by filling in the details below"
        className="text-sm font-medium text-[#072F5F]"
      />
      <form
        method="POST"
        onSubmit={handleCreateNewUser}
        className="w-full max-w-sm md:max-w-2xl mt-8 bg-white rounded px-6 pt-6 pb-8 mb-4 shadow-md"
      >
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
              {formErrors.firstname}
            </div>
            <input
              type="text"
              name="firstname"
              className="border text-sm border-grey-light w-full p-3 rounded-full mb-4"
              placeholder="Enter your email"
              value={userForm?.firstname}
              onChange={handleChange}
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
              {formErrors.lastname}
            </div>
            <input
              type="text"
              name="lastname"
              className="border text-sm border-grey-light w-full p-3 rounded-full mb-4"
              placeholder="Enter your last name"
              value={userForm?.lastname}
              onChange={handleChange}
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
                value={userForm?.email}
                onChange={handleChange}
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
            <div className="text-red-500 text-sm py-2">{formErrors.mobile}</div>
            <input
              type="text"
              name="mobile"
              className="border text-sm border-grey-light w-full p-3 rounded-full mb-4"
              placeholder="Enter your phone number"
              value={userForm?.mobile}
              onChange={handleChange}
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
          <div className="text-red-500 text-sm py-2">{formErrors.password}</div>
          <input
            type={passwordVisible ? "text" : "password"}
            name="password"
            className="border text-sm border-grey-light w-full p-3 rounded-full pr-12"
            placeholder="Enter your password"
            value={userForm?.password}
            onChange={handleChange}
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
            isSignupUser
              ? "bg-blue hover:bg-indigo cursor-not-allowed loading"
              : "bg-[#072F5F] cursor-pointer hover:bg-teal"
          } text-white text-sm font-bold py-3 w-full px-4 rounded-full focus:outline-none`}
          disabled={isSignupUser}
        >
          {isSignupUser ? (
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

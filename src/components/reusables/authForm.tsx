"use client";
import { FormConfigProps } from "@/types/FormConfigProps";
import { formConfig } from "../../../utils/formConfig";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FiArrowRight } from "react-icons/fi";
import { authAsync } from "@/redux/features/authSlice";
import { AppDispatch, RootState } from "@/redux/store/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";

interface AuthFormProps {
  formConfig: FormConfigProps;
  onSubmit: (formData: any, rememberMe: boolean) => void;
  rememberMe: boolean;
  onRememberMeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({
  formConfig,
  onSubmit,
  rememberMe,
  onRememberMeChange,
}) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(
    (state: RootState) => state.authentication.isLoading
  );
  const [formData, setFormData] = useState(formConfig.initialData);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(isLoading);
  //   const [rememberMe, setRememberMe] = useState(false);

  const validationSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRememberMe = (e: React.ChangeEvent<HTMLInputElement>) => {
    // onRememberMeChange();
    // setRememberMe(e.target.checked);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData, rememberMe);
    // try {
    //     validationSchema.parse(formData); // Validate the form data using Zod
    //     // Now you can call your submission logic here
    //     // For example, you can check the formType and call the appropriate function
    //     if (formData.type === "login") {
    //       // Call the login logic
    //       // Example: login(formData, rememberMe);
    //     } else if (formData.type === "signup") {
    //       // Call the signup logic
    //       // Example: signup(formData);
    //     } else if (formData.type === "recover") {
    //       // Call the recover password logic
    //       // Example: recoverPassword(formData);
    //     }
    //   } catch (error) {
    //     console.error("Form validation failed:", error);
    //   }
  };

  return (
    <>
      <h1 className="font-bold text-lg mt-5 text-[#072F5F]">
        {formConfig.title}
      </h1>
      <p className="text-sm font-medium text-[#072F5F]">
        {formConfig.description}
      </p>
      <form
        onSubmit={handleFormSubmit}
        className="w-full max-w-sm md:max-w-md mt-8 bg-white rounded
        px-6 pt-6 pb-8 mb-4 shadow-md"
      >
        {formConfig?.fields?.map((field: any) => (
          <div
            key={field.name}
            className="flex flex-col justify-start items-start"
          >
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-gray-600 pb-1"
            >
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              className="border text-sm border-grey-light w-full p-3 rounded-full mb-4"
              placeholder={field.placeholder}
              value={formData?.[field.name] || ""}
              onChange={handleChange}
              required={field.required}
            />
          </div>
        ))}

        {/* login */}
        {formConfig.type === "login" && (
          <div>
            {formConfig?.fields?.map((field: any) => (
              <div
                key={field.name}
                className="flex flex-col justify-start items-start"
              >
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-600 pb-1"
                >
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  className="border text-sm border-grey-light w-full p-3 rounded-full mb-4"
                  placeholder={field.placeholder}
                  value={formData?.[field.name] || ""}
                  onChange={handleChange}
                  required={field.required}
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
            ))}
          </div>
        )}

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
        {/* // Inside the AuthForm component */}
        {formConfig.type === "signup" && (
          <div>
            {formConfig?.fields?.map((field: any) => (
              <div
                key={field.name}
                className="flex flex-col justify-start items-start"
              >
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-600 pb-1"
                >
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  className="border text-sm border-grey-light w-full p-3 rounded-full mb-4"
                  placeholder={field.placeholder}
                  value={formData?.[field.name] || ""}
                  onChange={handleChange}
                  required={field.required}
                />
              </div>
            ))}
          </div>
        )}

        {/* // recover password */}
        {formConfig.type === "recover" && (
          <div>
            {formConfig?.fields?.map((field: any) => (
              <div
                key={field.name}
                className="flex flex-col justify-start items-start"
              >
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-600 pb-1"
                >
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  className="border text-sm border-grey-light w-full p-3 rounded-full mb-4"
                  placeholder={field.placeholder}
                  value={formData?.[field.name] || ""}
                  onChange={handleChange}
                  required={field.required}
                />
              </div>
            ))}
          </div>
        )}

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
            "Logging In..."
          ) : (
            <div className="flex flex-row justify-center items-center gap-2">
              Sign in <FiArrowRight className="font-medium text-lg" />
            </div>
          )}
        </button>
      </form>
    </>
  );
};

export default AuthForm;

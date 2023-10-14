import Link from 'next/link';
import React from 'react';

const SignupPage = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-full">
      <div className="md:w-1/2 px-4 py-8">
        <h1 className="text-3xl font-semibold">Sign Up for Your Account</h1>
        <form className="mt-4">
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email Address:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4 flex justify-between">
            <label htmlFor="rememberMe" className="flex items-center text-sm font-medium text-gray-600">
              <input type="checkbox" id="rememberMe" name="rememberMe" className="mr-2" />
              Remember Me
            </label>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
            Submit
          </button>
          <p className='mt-4 text-center'>By clicking sign up, you accept Sofan’s Terms of service</p>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-500">
            Log in
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
  );
};

export default SignupPage;

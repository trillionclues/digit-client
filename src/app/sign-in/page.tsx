import Link from 'next/link';
import React from 'react';

const SignIn = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-full">
      <div className="md:w-1/2 px-4 py-8">
        <h1 className="text-3xl font-semibold">Login to Your Account</h1>
        <form className="mt-4">
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
            <Link href="/forgot-password" className="text-blue-500">
              Forgot your password?
            </Link>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
            Submit
          </button>
        </form>
        <p className="mt-4">
          Don't have an account?{' '}
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
  );
};

export default SignIn;

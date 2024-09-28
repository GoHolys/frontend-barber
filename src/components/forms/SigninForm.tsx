"use client";

import { loginUserAction } from "@/app/actions/auth/auth";
import Link from "next/link";
import { useFormState } from "react-dom";

export function SigninForm() {
  const [serverState, formAction] = useFormState(loginUserAction, undefined);

  return (
    <div className="w-full max-w-md">
      <form action={formAction}>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4 space-y-1">
            <h2 className="text-3xl font-bold">Sign In</h2>
            <p className="text-gray-600 text-sm">
              Enter your details to sign in to your account
            </p>
          </div>
          <div className="px-6 py-4 space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="username"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="px-6 py-4">
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Sign In
            </button>
            <div className="mb-4 text-center">
              {serverState?.error?.message && (
                <small className="text-red-500">
                  {serverState?.error?.message}
                </small>
              )}
            </div>
          </div>
        </div>
        <div className="mt-4 text-center text-sm">
          Sign up here
          <Link
            className="underline ml-2 text-blue-600 hover:text-blue-800"
            href="sign-up"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}

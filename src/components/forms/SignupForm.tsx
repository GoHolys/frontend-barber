"use client";

import { registerUserAction } from "@/app/actions/auth/auth";
import { DealFormState, StringMap } from "@/app/types/deal";
import Link from "next/link";
import { useFormState } from "react-dom";

const initialState: DealFormState<StringMap> = {};

export function SignupForm() {
  const [serverState, formAction] = useFormState(
    registerUserAction,
    initialState
  );

  return (
    <div className="w-full max-w-md">
      <form action={formAction}>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <h2 className="text-3xl font-bold mb-2">Sign Up</h2>
            <p className="text-gray-600 text-sm">
              Enter your details to create a new account
            </p>
          </div>
          <div className="mb-6">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                name="username"
                type="text"
                placeholder="username"
              />
              <div className="mb-4">
                {serverState.errors?.username && (
                  <small className="text-red-500">
                    {serverState.errors?.username}
                  </small>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="firstname"
              >
                First Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First Name"
              />
              <div className="mb-4">
                {serverState.errors?.firstName && (
                  <small className="text-red-500">
                    {serverState.errors?.firstName}
                  </small>
                )}
              </div>
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                name="password"
                type="password"
                placeholder="password"
              />
              <div>
                {serverState.errors?.password && (
                  <small className="text-red-500">
                    {serverState.errors?.password}
                  </small>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              Sign Up
            </button>
          </div>
          {serverState.successMessage && (
            <small className="text-green-500">
              {serverState.successMessage}
            </small>
          )}
        </div>
        <div className="text-center mt-4 text-sm">
          Have an account?
          <Link
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 ml-2"
            href="sign-in"
          >
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}

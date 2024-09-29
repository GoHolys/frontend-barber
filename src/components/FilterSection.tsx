"use client";

import { filterAppointmentAction } from "@/app/actions/appointments/appointment";
import React from "react";
import { useFormState } from "react-dom";

export default function FilterSection() {
  const [serverState, formAction] = useFormState(
    filterAppointmentAction,
    undefined
  );

  return (
    <form
      className="bg-white  rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
      action={formAction}
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="date"
        >
          Date
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="date"
          name="date"
          type="date"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="firstName"
        >
          First Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="firstName"
          name="firstName"
          type="text"
        />
      </div>

      <div className="flex items-center justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Filter
        </button>
      </div>
    </form>
  );
}

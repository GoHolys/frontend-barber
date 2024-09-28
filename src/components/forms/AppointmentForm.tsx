"use client";

import { StringMap } from "@/app/types/deal";
import { useFormState } from "react-dom";

interface AppointmentFormProps {
  appointmentId?: string;
  formHandlerAction: (
    appointmentId: string,
    prevState: unknown,
    formData: FormData
  ) => Promise<
    | {
        errors: StringMap;
        successMessage?: undefined;
      }
    | {
        successMessage: string;
        errors?: undefined;
      }
  >;
}

export default function AppointmentForm({
  formHandlerAction,
  appointmentId,
}: AppointmentFormProps) {
  const [serverState, formAction] = useFormState(
    formHandlerAction.bind(null, appointmentId || ""),
    undefined
  );

  console.log(serverState);

  return (
    <div className="flex justify-center mt-10 w-full ">
      <form
        action={formAction}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
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
          {serverState?.errors?.date && (
            <small className="text-red-500">{serverState?.errors?.date}</small>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="time"
          >
            Time
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="time"
            name="time"
            type="time"
          />
          {serverState?.errors?.time && (
            <small className="text-red-500">{serverState?.errors?.time}</small>
          )}
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

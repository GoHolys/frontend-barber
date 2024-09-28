import { createAppointmentAction } from "@/app/actions/appointments/appointment";
import { auth } from "@/auth";
import AppointmentForm from "@/components/forms/AppointmentForm";
import React from "react";

export default async function AddAppointment() {
  const session = await auth();

  return (
    <div>
      {session && (
        <AppointmentForm formHandlerAction={createAppointmentAction} />
      )}
    </div>
  );
}

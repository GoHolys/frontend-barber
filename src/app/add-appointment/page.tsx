import AppointmentForm from "@/components/forms/AppointmentForm";
import React from "react";
import { createAppointmentAction } from "../actions/appointments/appointment";

export default function AddAppointment() {
  return (
    <div>
      <AppointmentForm formHandlerAction={createAppointmentAction} />
    </div>
  );
}

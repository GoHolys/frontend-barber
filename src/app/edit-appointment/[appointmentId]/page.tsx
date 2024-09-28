import AppointmentForm from "@/components/forms/AppointmentForm";
import { editAppointmentAction } from "../../actions/appointments/appointment";

export default function EditAppointment({
  params,
}: {
  params: { appointmentId: string };
}) {
  return (
    <AppointmentForm
      formHandlerAction={editAppointmentAction}
      appointmentId={params.appointmentId}
    />
  );
}

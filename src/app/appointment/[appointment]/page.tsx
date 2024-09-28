import axios from "axios";
import React from "react";

async function getAppointment(appointmentId: string) {
  try {
    const response = await axios.get(
      `${process.env.BACKEND_URL}/appointment/${appointmentId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return [];
  }
}

export default async function Appointment({
  params,
}: {
  params: { appointment: string };
}) {
  const appointment = await getAppointment(params.appointment);
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Appointment Record
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-semibold">ID:</span>
            <span>{appointment.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">User ID:</span>
            <span>{appointment.userId}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">First Name:</span>
            <span>{appointment.firstName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Time:</span>
            <span>{new Date(appointment.time).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Created At:</span>
            <span>{new Date(appointment.createdAt).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Updated At:</span>
            <span>{new Date(appointment.updatedAt).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

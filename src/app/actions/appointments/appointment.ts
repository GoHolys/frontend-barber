"use server";

import { auth } from "@/auth";
import { axiosInstance } from "@/axiosInstance";
import { convertZodErrors } from "@/errors/utils";
import { createAppointmentSchema } from "./schema";
import { redirect } from "next/navigation";

type Methods = "put" | "post" | "patch" | "delete" | "get";

export const appointmentAction = async (
  formData: FormData,
  endpoint: string,
  httpMethod: Methods
) => {
  const unvalidatedData = {
    time: formData.get("time"),
    date: formData.get("date"),
  };

  const session = await auth();

  const validated = createAppointmentSchema.safeParse(unvalidatedData);

  if (!validated.success) {
    const errors = convertZodErrors(validated.error);
    return { errors };
  }
  try {
    const formattedDate = new Date(
      `${validated.data.date.toString().slice(0, 19)}${validated.data.time}Z`
    ).toISOString();
    console.log(formattedDate);
    await axiosInstance[httpMethod](endpoint, {
      time: formattedDate,
      userId: session?.user.id,
    });
  } catch (err) {
    console.log(err);
  }
  redirect("/");
};

export const createAppointmentAction = async (
  _: string,
  prevState: unknown,
  formData: FormData
) => {
  const result = await appointmentAction(formData, "/appointment", "post");
  return result;
};

export const editAppointmentAction = async (
  appointmentId: string,
  prevState: unknown,
  formData: FormData
) => {
  const result = await appointmentAction(
    formData,
    `/appointment/${appointmentId}`,
    "patch"
  );
  return result;
};

export const deleteAppointmentAction = async (appointmentId: number) => {
  await axiosInstance.delete(`/appointment/${appointmentId}`);
};

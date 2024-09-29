"use server";

import { auth } from "@/auth";
import { axiosInstance } from "@/axiosInstance";
import { convertZodErrors } from "@/errors/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAppointmentSchema, filterAppointmentSchema } from "./schema";

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

  console.log(unvalidatedData);

  const session = await auth();

  const validated = createAppointmentSchema.safeParse(unvalidatedData);

  if (!validated.success) {
    const errors = convertZodErrors(validated.error);
    return { errors };
  }
  try {
    const formattedDate = new Date(
      `${validated.data.date.toISOString().split("T")[0]}T${
        validated.data.time
      }:00`
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
  const response = await appointmentAction(
    formData,
    `/appointment/${appointmentId}`,
    "patch"
  );
  return response;
};

export const deleteAppointmentAction = async (appointmentId: number) => {
  try {
    await axiosInstance.delete(`/appointment/${appointmentId}`);
  } catch (err) {
    console.log(err);
  }
};

export const filterAppointmentAction = async (
  prevState: unknown,
  formData: FormData
) => {
  const unvalidatedData = {
    time: formData.get("date"),
    firstName: formData.get("firstName"),
  };

  const validated = filterAppointmentSchema.safeParse(unvalidatedData);

  if (!validated.success) {
    const errors = convertZodErrors(validated.error);
    return { errors };
  }
  const formattedDate =
    validated.data.time && new Date(validated.data.time).toISOString();
  revalidatePath("/");
  redirect(
    `/?firstName=${encodeURIComponent(
      validated.data.firstName
    )}&time=${encodeURIComponent(formattedDate)}`
  );
};

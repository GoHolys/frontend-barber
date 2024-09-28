import { z } from "zod";

export const createAppointmentSchema = z.object({
  date: z.coerce
    .date()
    .min(new Date(), { message: "The chosen date must be from now " }),
  time: z
    .string()
    .regex(/^\d{2}:\d{2}$/, { message: "Time wasn't in the right format" }),
});

export const filterAppointmentSchema = z.object({
  time: z.coerce.date().or(z.literal("")),
  firstName: z.string().min(0).or(z.literal("")),
});

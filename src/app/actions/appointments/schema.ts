import { z } from "zod";

export const createAppointmentSchema = z.object({
  date: z.coerce
    .date()
    .min(new Date(), { message: "The chosen date must be from now " }),
  time: z
    .string()
    .regex(/^\d{2}:\d{2}$/, { message: "Time wasn't in the right format" }),
});

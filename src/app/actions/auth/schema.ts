import { z } from "zod";

export const registerUserSchema = z.object({
  firstName: z
    .string({ message: "First name is required" })
    .min(2, "First Name must be at least 2 characters long"),
  username: z
    .string({ message: "Name is required" })
    .min(2, "Name must be at least 2 characters long"),
  password: z
    .string({ message: "Password is required" })
    .min(4, "Password must be at least 4 characters long"),
});

export const loginUserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});
 
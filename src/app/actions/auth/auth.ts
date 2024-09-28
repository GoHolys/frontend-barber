"use server";
import { DealFormState, StringMap } from "@/app/types/deal";
import { convertZodErrors } from "@/errors/utils";
import axios from "axios";
import { loginUserSchema, registerUserSchema } from "./schema";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function registerUserAction(
  prevState: DealFormState<StringMap>,
  formData: FormData
): Promise<DealFormState<StringMap>> {
  const unvalidatedData = Object.fromEntries(formData.entries());
  const validated = registerUserSchema.safeParse(unvalidatedData);

  if (!validated.success) {
    const errors = convertZodErrors(validated.error);
    return { errors };
  }
  const { firstName, username, password } = validated.data;
  try {
    await axios.post(`${process.env.BACKEND_URL}/auth/register`, {
      firstName,
      username,
      password,
    });
    return { successMessage: "User has been created successfully" };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { errors: error.response?.data || "Failed to create user" };
    }
    return { errors: { generic: "An unexpected error occurred" } };
  }
}

export async function loginUserAction(prevState: unknown, formData: FormData) {
  const unvalidatedData = Object.fromEntries(formData.entries());
  const validated = loginUserSchema.safeParse(unvalidatedData);

  if (!validated.success) {
    const errors = convertZodErrors(validated.error);
    return { errors };
  }

  const { username, password } = validated.data;

  try {
    const response = await signIn("credentials", {
      username,
      password,
      redirect: true,
      redirectTo: "/",
    });
    return response;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: { message: "Invalid credentials" },
          };
        default:
          return {
            error: { message: "Something went wrong." },
          };
      }
    }
    throw error;
  }
}

export async function handleSignOut() {
  await signOut();
}

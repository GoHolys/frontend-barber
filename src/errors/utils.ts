import { StringMap } from "@/app/types/deal";
import { ZodError } from "zod";

export const convertZodErrors = (error: ZodError): StringMap => {
  return error.issues.reduce((acc: StringMap, issue) => {
    acc[issue.path[0]] = issue.message;
    return acc;
  }, {});
};

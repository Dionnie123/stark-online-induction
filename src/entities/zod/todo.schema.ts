import { boolean, object, string } from "zod";

export const todoSchema = object({
  title: string({ required_error: "Title is required." }).min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description: string()
    .max(500, "Description must be 500 char or less.")
    .optional()
    .nullable(),
  isCompleted: boolean().default(false),
  userId: string().nullish(),
});

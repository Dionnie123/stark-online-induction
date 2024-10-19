import { boolean, object, string } from "zod";

export const todoSchema = object({
  title: string({ required_error: "Title is required." }).min(
    1,
    "Title is required."
  ),
  description: string()
    .max(500, "Description must be 500 char or less.")
    .nullable()
    .optional(),
  isCompleted: boolean().default(false),
  userId: string().optional(),
});

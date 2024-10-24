import { object, string } from "zod";

export const passwordlessSchema = object({
  email: string({ required_error: "Email is required" }).min(
    1,
    "Email is required"
  ),
});

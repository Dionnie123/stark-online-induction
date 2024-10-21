import { boolean, object, string } from "zod";

export const userSchema = object({
  name: string({ required_error: "Name is required." })
    .min(1, {})
    .nullable()
    .optional(),
  email: string({ required_error: "Email is required." }).min(1, {}),
  password: string({ required_error: "Email is required." }).min(1, {}),
  newPassword: string({ required_error: "Password is required." }).min(1, {}),
  confirmPassword: string({ required_error: "Password is required." }).min(
    1,
    {}
  ),
});

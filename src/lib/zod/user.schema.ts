import { object, string } from "zod";

export const UserSchema = object({
  email: string().min(1),
  name: string().optional().nullable(),
  password: string().min(8).optional().nullable(),
  newPassword: string().min(8).optional().nullable(),
  confirmPassword: string().min(8).optional().nullable(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

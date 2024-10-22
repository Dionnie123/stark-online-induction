import { boolean, object, string } from "zod";

export const todoSchema = object({
  title: string(),
  description: string().max(500).optional().nullable(),
  isCompleted: boolean().default(false),
  userId: string().optional(),
});

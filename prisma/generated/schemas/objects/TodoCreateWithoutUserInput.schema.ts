import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.TodoCreateWithoutUserInput> = z
  .object({
    id: z.string().optional(),
    title: z.string(),
    description: z.string().optional().nullable(),
    isCompleted: z.boolean().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })
  .strict();

export const TodoCreateWithoutUserInputObjectSchema = Schema;

import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.TodoUncheckedCreateInput> = z
  .object({
    id: z.string().optional(),
    userId: z.string(),
    title: z.string(),
    description: z.string().optional().nullable(),
    isCompleted: z.boolean().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })
  .strict();

export const TodoUncheckedCreateInputObjectSchema = Schema;

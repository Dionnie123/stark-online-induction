import { z } from 'zod';
import { UserCreateNestedOneWithoutTodoInputObjectSchema } from './UserCreateNestedOneWithoutTodoInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.TodoCreateInput> = z
  .object({
    id: z.string().optional(),
    title: z.string(),
    description: z.string().optional().nullable(),
    isCompleted: z.boolean().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    user: z.lazy(() => UserCreateNestedOneWithoutTodoInputObjectSchema),
  })
  .strict();

export const TodoCreateInputObjectSchema = Schema;

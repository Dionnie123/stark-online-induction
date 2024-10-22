import { z } from 'zod';
import { TodoCreateManyUserInputObjectSchema } from './TodoCreateManyUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.TodoCreateManyUserInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => TodoCreateManyUserInputObjectSchema),
      z.lazy(() => TodoCreateManyUserInputObjectSchema).array(),
    ]),
  })
  .strict();

export const TodoCreateManyUserInputEnvelopeObjectSchema = Schema;

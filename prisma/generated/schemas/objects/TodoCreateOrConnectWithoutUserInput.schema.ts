import { z } from 'zod';
import { TodoWhereUniqueInputObjectSchema } from './TodoWhereUniqueInput.schema';
import { TodoCreateWithoutUserInputObjectSchema } from './TodoCreateWithoutUserInput.schema';
import { TodoUncheckedCreateWithoutUserInputObjectSchema } from './TodoUncheckedCreateWithoutUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.TodoCreateOrConnectWithoutUserInput> = z
  .object({
    where: z.lazy(() => TodoWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => TodoCreateWithoutUserInputObjectSchema),
      z.lazy(() => TodoUncheckedCreateWithoutUserInputObjectSchema),
    ]),
  })
  .strict();

export const TodoCreateOrConnectWithoutUserInputObjectSchema = Schema;

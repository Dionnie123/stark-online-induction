import { z } from 'zod';
import { TodoWhereUniqueInputObjectSchema } from './TodoWhereUniqueInput.schema';
import { TodoUpdateWithoutUserInputObjectSchema } from './TodoUpdateWithoutUserInput.schema';
import { TodoUncheckedUpdateWithoutUserInputObjectSchema } from './TodoUncheckedUpdateWithoutUserInput.schema';
import { TodoCreateWithoutUserInputObjectSchema } from './TodoCreateWithoutUserInput.schema';
import { TodoUncheckedCreateWithoutUserInputObjectSchema } from './TodoUncheckedCreateWithoutUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.TodoUpsertWithWhereUniqueWithoutUserInput> = z
  .object({
    where: z.lazy(() => TodoWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => TodoUpdateWithoutUserInputObjectSchema),
      z.lazy(() => TodoUncheckedUpdateWithoutUserInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => TodoCreateWithoutUserInputObjectSchema),
      z.lazy(() => TodoUncheckedCreateWithoutUserInputObjectSchema),
    ]),
  })
  .strict();

export const TodoUpsertWithWhereUniqueWithoutUserInputObjectSchema = Schema;

import { z } from 'zod';
import { TodoWhereUniqueInputObjectSchema } from './TodoWhereUniqueInput.schema';
import { TodoUpdateWithoutUserInputObjectSchema } from './TodoUpdateWithoutUserInput.schema';
import { TodoUncheckedUpdateWithoutUserInputObjectSchema } from './TodoUncheckedUpdateWithoutUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.TodoUpdateWithWhereUniqueWithoutUserInput> = z
  .object({
    where: z.lazy(() => TodoWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => TodoUpdateWithoutUserInputObjectSchema),
      z.lazy(() => TodoUncheckedUpdateWithoutUserInputObjectSchema),
    ]),
  })
  .strict();

export const TodoUpdateWithWhereUniqueWithoutUserInputObjectSchema = Schema;

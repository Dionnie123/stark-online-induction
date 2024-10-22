import { z } from 'zod';
import { TodoScalarWhereInputObjectSchema } from './TodoScalarWhereInput.schema';
import { TodoUpdateManyMutationInputObjectSchema } from './TodoUpdateManyMutationInput.schema';
import { TodoUncheckedUpdateManyWithoutTodoInputObjectSchema } from './TodoUncheckedUpdateManyWithoutTodoInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.TodoUpdateManyWithWhereWithoutUserInput> = z
  .object({
    where: z.lazy(() => TodoScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => TodoUpdateManyMutationInputObjectSchema),
      z.lazy(() => TodoUncheckedUpdateManyWithoutTodoInputObjectSchema),
    ]),
  })
  .strict();

export const TodoUpdateManyWithWhereWithoutUserInputObjectSchema = Schema;

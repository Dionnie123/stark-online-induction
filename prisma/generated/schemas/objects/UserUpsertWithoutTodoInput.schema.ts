import { z } from 'zod';
import { UserUpdateWithoutTodoInputObjectSchema } from './UserUpdateWithoutTodoInput.schema';
import { UserUncheckedUpdateWithoutTodoInputObjectSchema } from './UserUncheckedUpdateWithoutTodoInput.schema';
import { UserCreateWithoutTodoInputObjectSchema } from './UserCreateWithoutTodoInput.schema';
import { UserUncheckedCreateWithoutTodoInputObjectSchema } from './UserUncheckedCreateWithoutTodoInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpsertWithoutTodoInput> = z
  .object({
    update: z.union([
      z.lazy(() => UserUpdateWithoutTodoInputObjectSchema),
      z.lazy(() => UserUncheckedUpdateWithoutTodoInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutTodoInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutTodoInputObjectSchema),
    ]),
  })
  .strict();

export const UserUpsertWithoutTodoInputObjectSchema = Schema;

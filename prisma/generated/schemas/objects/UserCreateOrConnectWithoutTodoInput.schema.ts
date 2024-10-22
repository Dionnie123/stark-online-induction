import { z } from 'zod';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutTodoInputObjectSchema } from './UserCreateWithoutTodoInput.schema';
import { UserUncheckedCreateWithoutTodoInputObjectSchema } from './UserUncheckedCreateWithoutTodoInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateOrConnectWithoutTodoInput> = z
  .object({
    where: z.lazy(() => UserWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => UserCreateWithoutTodoInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutTodoInputObjectSchema),
    ]),
  })
  .strict();

export const UserCreateOrConnectWithoutTodoInputObjectSchema = Schema;

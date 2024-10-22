import { z } from 'zod';
import { UserCreateWithoutTodoInputObjectSchema } from './UserCreateWithoutTodoInput.schema';
import { UserUncheckedCreateWithoutTodoInputObjectSchema } from './UserUncheckedCreateWithoutTodoInput.schema';
import { UserCreateOrConnectWithoutTodoInputObjectSchema } from './UserCreateOrConnectWithoutTodoInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateNestedOneWithoutTodoInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutTodoInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutTodoInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => UserCreateOrConnectWithoutTodoInputObjectSchema)
      .optional(),
    connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const UserCreateNestedOneWithoutTodoInputObjectSchema = Schema;

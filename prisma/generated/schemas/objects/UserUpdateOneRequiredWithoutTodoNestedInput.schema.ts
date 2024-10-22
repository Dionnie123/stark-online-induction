import { z } from 'zod';
import { UserCreateWithoutTodoInputObjectSchema } from './UserCreateWithoutTodoInput.schema';
import { UserUncheckedCreateWithoutTodoInputObjectSchema } from './UserUncheckedCreateWithoutTodoInput.schema';
import { UserCreateOrConnectWithoutTodoInputObjectSchema } from './UserCreateOrConnectWithoutTodoInput.schema';
import { UserUpsertWithoutTodoInputObjectSchema } from './UserUpsertWithoutTodoInput.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateWithoutTodoInputObjectSchema } from './UserUpdateWithoutTodoInput.schema';
import { UserUncheckedUpdateWithoutTodoInputObjectSchema } from './UserUncheckedUpdateWithoutTodoInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutTodoNestedInput> = z
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
    upsert: z.lazy(() => UserUpsertWithoutTodoInputObjectSchema).optional(),
    connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => UserUpdateWithoutTodoInputObjectSchema),
        z.lazy(() => UserUncheckedUpdateWithoutTodoInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const UserUpdateOneRequiredWithoutTodoNestedInputObjectSchema = Schema;

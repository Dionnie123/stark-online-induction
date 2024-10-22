import { z } from 'zod';
import { TodoCreateWithoutUserInputObjectSchema } from './TodoCreateWithoutUserInput.schema';
import { TodoUncheckedCreateWithoutUserInputObjectSchema } from './TodoUncheckedCreateWithoutUserInput.schema';
import { TodoCreateOrConnectWithoutUserInputObjectSchema } from './TodoCreateOrConnectWithoutUserInput.schema';
import { TodoCreateManyUserInputEnvelopeObjectSchema } from './TodoCreateManyUserInputEnvelope.schema';
import { TodoWhereUniqueInputObjectSchema } from './TodoWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.TodoUncheckedCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TodoCreateWithoutUserInputObjectSchema),
          z.lazy(() => TodoCreateWithoutUserInputObjectSchema).array(),
          z.lazy(() => TodoUncheckedCreateWithoutUserInputObjectSchema),
          z.lazy(() => TodoUncheckedCreateWithoutUserInputObjectSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TodoCreateOrConnectWithoutUserInputObjectSchema),
          z.lazy(() => TodoCreateOrConnectWithoutUserInputObjectSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => TodoCreateManyUserInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => TodoWhereUniqueInputObjectSchema),
          z.lazy(() => TodoWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TodoUncheckedCreateNestedManyWithoutUserInputObjectSchema = Schema;

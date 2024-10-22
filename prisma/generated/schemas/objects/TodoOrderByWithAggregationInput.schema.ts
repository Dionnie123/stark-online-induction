import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { TodoCountOrderByAggregateInputObjectSchema } from './TodoCountOrderByAggregateInput.schema';
import { TodoMaxOrderByAggregateInputObjectSchema } from './TodoMaxOrderByAggregateInput.schema';
import { TodoMinOrderByAggregateInputObjectSchema } from './TodoMinOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.TodoOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    title: z.lazy(() => SortOrderSchema).optional(),
    description: z.lazy(() => SortOrderSchema).optional(),
    isCompleted: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => TodoCountOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => TodoMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => TodoMinOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const TodoOrderByWithAggregationInputObjectSchema = Schema;

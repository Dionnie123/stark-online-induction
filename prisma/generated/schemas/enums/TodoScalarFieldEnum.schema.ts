import { z } from 'zod';

export const TodoScalarFieldEnumSchema = z.enum([
  'id',
  'userId',
  'title',
  'description',
  'isCompleted',
  'createdAt',
  'updatedAt',
]);

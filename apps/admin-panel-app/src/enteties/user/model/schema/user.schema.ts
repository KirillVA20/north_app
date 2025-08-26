import { z } from 'zod';

// Mongo ObjectId format
const objectId = z.string().regex(/^[a-fA-F0-9]{24}$/u, 'Invalid ObjectId');

export const UserSchema = z.object({
  id: objectId,
  email: z.string().email('Invalid email'),
  username: z.string().min(1, 'Username is required'),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export const CreateUserSchema = z.object({
  email: z.string().email('Invalid email'),
  username: z.string().min(3, 'Min 3 characters'),
  password: z.string().min(6, 'Min 6 characters'),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export type UserSchemaType = z.infer<typeof UserSchema>;
export type CreateUserSchemaType = z.infer<typeof CreateUserSchema>;

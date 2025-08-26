import { z } from 'zod';

export const UserSchema = z.object({
  email: z.string().email({ message: 'Некорректный email' }),
  username: z.string().min(1, { message: 'Имя пользователя не может быть пустым' }),
  password: z.string().min(6, { message: 'Пароль должен содержать минимум 6 символов' }),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

// Тип для TypeScript, основанный на схеме
export type User = z.infer<typeof UserSchema>;

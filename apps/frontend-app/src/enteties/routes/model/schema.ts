import { z } from 'zod';

// Точка маршрута
export const RoutePointSchema = z.object({
  coordinates: z.tuple([z.number(), z.number()]),
  photo: z.string().optional(),
  description: z.string().optional(),
});

export const RouteBaseSchema = z.object({
  name: z.string().min(1, 'Название обязательно'),
  description: z.string().optional(),
});

// Полная схема для валидации ответов API
export const RouteSchema = RouteBaseSchema.extend({
  _id: z.string(),
  points: z.array(RoutePointSchema).min(2),
  // spots: z.array(z.string()),
  // createdAt: z.string().datetime(),
});

// Схема для создания маршрута
export const CreateRouteSchema = z.object({
  points: z.array(RoutePointSchema).min(2),
  name: z.string().min(1, 'Название обязательно'),
  description: z.string().optional(),
});

// Схема для обновления (все поля опциональны)
export const UpdateRouteSchema = RouteBaseSchema.partial().extend({
  spotIds: z.array(z.string()).min(2).optional(),
});

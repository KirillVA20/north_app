import { z } from 'zod';

// Валидация GeoJSON Point
const GeoJSONPointSchema = z.object({
  _id: z.string(),
  type: z.literal('Point'),
  coordinates: z.tuple([z.number(), z.number()]), // [lng, lat]
});

// Валидация фото
const SpotPhotoSchema = z.object({
  url: z.string().url(),
});

// Основная схема Spot
export const SpotSchema = z.object({
  _id: z.string(),
  name: z.string().min(1, 'Название обязательно'),
  description: z.string().optional(),
  location: GeoJSONPointSchema,
  photos: z.array(SpotPhotoSchema).optional(),
  route: z.string().optional(), // ID маршрута
});

// Схема для создания/обновления (без id)
export const CreateSpotSchema = z.object({
  name: z.string().min(1, 'Название обязательно'),
  description: z.string().optional(),
  lng: z.number().min(-180).max(180),
  lat: z.number().min(-90).max(90),
  photos: z.instanceof(File).array().optional(), // Для FormData
});

export type Spot = z.infer<typeof SpotSchema>;
export type CreateSpotDto = z.infer<typeof CreateSpotSchema>;

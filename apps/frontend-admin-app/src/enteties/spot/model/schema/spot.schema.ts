import { z } from 'zod';

// Mongo ObjectId format
const objectId = z.string().regex(/^[a-fA-F0-9]{24}$/u, 'Invalid ObjectId');

export const SpotLocationSchema = z.object({
  type: z.literal('Point'),
  coordinates: z.tuple([z.number(), z.number()]),
});
export const PathPointSchema = z.object({
  id: z.string().optional(),
  coordinates: z.tuple([z.number(), z.number()]),
});
export const SpotSchema = z.object({
  id: objectId,
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  location: SpotLocationSchema,
  previewImageUrl: z.string().url().optional(),
  path: z.array(PathPointSchema).default([]),
  userId: objectId,
});

export const CreateSpotSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  lat: z.number(),
  lng: z.number(),
  description: z.string().optional(),
  previewImageUrl: z.string().url().optional(),
  path: z.array(PathPointSchema).default([]),
});

export type PathPointType = z.infer<typeof PathPointSchema>;
export type SpotSchemaType = z.infer<typeof SpotSchema>;
export type CreateSpotSchemaType = z.input<typeof CreateSpotSchema>;

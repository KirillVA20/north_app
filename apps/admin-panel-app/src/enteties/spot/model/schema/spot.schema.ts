import { use } from 'react';
import { z } from 'zod';

// Mongo ObjectId format
const objectId = z.string().regex(/^[a-fA-F0-9]{24}$/u, 'Invalid ObjectId');

export const SpotLocationSchema = z.object({
  type: z.literal('Point'),
  coordinates: z.tuple([z.number(), z.number()]),
});

export const SpotSchema = z.object({
  id: objectId,
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  location: SpotLocationSchema,
  previewImageUrl: z.string().url().optional(),
  userId: objectId,
});

export const CreateSpotSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  lat: z.number(),
  lng: z.number(),
  description: z.string().optional(),
  previewImageUrl: z.string().url().optional(),
});

export type SpotSchemaType = z.infer<typeof SpotSchema>;
export type CreateSpotSchemaType = z.infer<typeof CreateSpotSchema>;

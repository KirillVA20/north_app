import z from 'zod';
import { SpotSchema } from './schema/spot.schema';

export type Spot = z.infer<typeof SpotSchema>;

export type CreateSpot = {
  name: string;
  lat: number;
  lng: number;
  description?: string;
  previewImageUrl?: string;
};

export type FavoriteSpotsResponse = {
  spots: Spot[];
};

export type FavoriteActionResponse = {
  message: string;
};

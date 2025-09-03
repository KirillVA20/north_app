export { SpotsTable } from './ui/spots-table';
export { SpotCard } from './ui/spot-card';

export {
  useSpotCreate,
  useDeleteSpot,
  useAddToFavorites,
  useRemoveFromFavorites,
} from './model/mutation-hooks';
export {
  useSpotById,
  useSpots,
  useSpotsByUserId,
  useFavoriteSpots,
  useIsSpotFavorite,
} from './model/query-hooks';
export { useFavoriteToggle } from './model/use-favorite-toggle';

export {
  CreateSpotSchema,
  type CreateSpotSchemaType,
} from './model/schema/spot.schema';

export type {
  Spot,
  CreateSpot,
  FavoriteSpotsResponse,
  FavoriteActionResponse,
} from './model/types';

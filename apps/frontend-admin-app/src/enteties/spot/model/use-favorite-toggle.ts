import { useAddToFavorites, useRemoveFromFavorites } from './mutation-hooks';
import { useIsSpotFavorite as useIsSpotFavoriteQuery } from './query-hooks';

export const useFavoriteToggle = (spotId: string) => {
  const { data: isFavorite, isPending: isCheckingFavorite } =
    useIsSpotFavoriteQuery(spotId);
  const { addToFavorites, isPending: isAdding } = useAddToFavorites();
  const { removeFromFavorites, isPending: isRemoving } =
    useRemoveFromFavorites();

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(spotId);
    } else {
      addToFavorites(spotId);
    }
  };

  return {
    isFavorite: isFavorite ?? false,
    isLoading: isCheckingFavorite || isAdding || isRemoving,
    toggleFavorite,
    addToFavorites: () => addToFavorites(spotId),
    removeFromFavorites: () => removeFromFavorites(spotId),
  };
};

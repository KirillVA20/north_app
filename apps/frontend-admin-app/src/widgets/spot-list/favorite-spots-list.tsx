import { Spot, useFavoriteSpots } from '@/enteties/spot';
import { SpotListUI } from './ui/spot-list-ui';

type FavoriteSpotsListProps = {
  onSpotSelect?: (spot: Spot) => void;
};

export const FavoriteSpotsList = ({ onSpotSelect }: FavoriteSpotsListProps) => {
  const { data, isPending, isError, refetch } = useFavoriteSpots();

  return (
    <SpotListUI
      data={data}
      isPending={isPending}
      isError={isError}
      onSpotSelect={onSpotSelect}
      onRefetch={refetch}
    />
  );
};

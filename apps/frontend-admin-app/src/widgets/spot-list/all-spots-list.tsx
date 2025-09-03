import { Spot, useSpots } from '@/enteties/spot';
import { SpotListUI } from './ui/spot-list-ui';

type AllSpotsListProps = {
  onSpotSelect?: (spot: Spot) => void;
};

export const AllSpotsList = ({ onSpotSelect }: AllSpotsListProps) => {
  const { data, isPending, isError, refetch } = useSpots();

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

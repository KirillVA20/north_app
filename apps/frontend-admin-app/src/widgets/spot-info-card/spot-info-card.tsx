import { SpotInfoCardView } from './ui/spot-info-card-view';
import { Spot, useDeleteSpot } from '@/enteties/spot';
import { useUserById } from '@/enteties/user';
import { AddToFavorite } from '@/features/spot/add-to-favorite';

export type SpotInfoCardProps = {
  spotData: Spot;
  onDelete?: () => void;
};

export const SpotInfoCard = ({ spotData, onDelete }: SpotInfoCardProps) => {
  const { deleteSpot, isPending } = useDeleteSpot();
  const { id, name, description, previewImageUrl, location, path } = spotData;
  const [lng, lat] = location.coordinates;
  const { data: userData } = useUserById(spotData.userId);

  const handleDelete = () => {
    deleteSpot(id, {
      onSuccess: () => {
        onDelete?.();
      },
    });
  };

  return (
    <SpotInfoCardView
      name={name}
      description={description}
      previewImageUrl={previewImageUrl}
      lng={lng}
      lat={lat}
      path={path}
      author={userData?.username}
      isPending={isPending}
      onDelete={handleDelete}
      toFavoriteNode={<AddToFavorite spotId={id} variant="surface" />}
    />
  );
};

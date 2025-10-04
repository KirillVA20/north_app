import { useFavoriteToggle } from '@/enteties/spot';
import { AddToFavoriteButton } from './ui/add-to-favorite-button';

type AddToFavoriteProps = {
  spotId: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline' | 'ghost' | 'surface';
  onToggle?: (isFavorite: boolean) => void;
};

export const AddToFavorite = ({
  spotId,
  size = 'md',
  variant = 'ghost',
  onToggle,
}: AddToFavoriteProps) => {
  const { isFavorite, isLoading, toggleFavorite } = useFavoriteToggle(spotId);

  const handleToggle = () => {
    toggleFavorite();
    onToggle?.(!isFavorite);
  };

  return (
    <AddToFavoriteButton
      isFavorite={isFavorite}
      isLoading={isLoading}
      onToggle={handleToggle}
      size={size}
      variant={variant}
    />
  );
};

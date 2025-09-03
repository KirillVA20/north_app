import { IconButton, Spinner } from '@chakra-ui/react';
import { FavoriteIcon } from '@test/ui';

type AddToFavoriteButtonProps = {
  isFavorite: boolean;
  isLoading: boolean;
  onToggle: () => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline' | 'ghost';
};

export const AddToFavoriteButton = ({
  isFavorite,
  isLoading,
  onToggle,
  size = 'md',
  variant = 'ghost',
}: AddToFavoriteButtonProps) => {
  return (
    <IconButton
      size={size}
      variant={variant}
      onClick={onToggle}
      disabled={isLoading}
      colorScheme={isFavorite ? 'red' : 'gray'}
      aria-label={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
    >
      {isLoading ? <Spinner size="xs" /> : <FavoriteIcon />}
    </IconButton>
  );
};

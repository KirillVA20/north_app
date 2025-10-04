import { IconButton, Spinner } from '@chakra-ui/react';
import { FavoriteIcon } from '@test/ui';

type AddToFavoriteButtonProps = {
  isFavorite: boolean;
  isLoading: boolean;
  onToggle: () => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline' | 'ghost' | 'surface';
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
      {isLoading ? (
        <Spinner size="xs" />
      ) : (
        <FavoriteIcon
          color={isFavorite ? '#ff6b6b' : '#fff'}
          fill={isFavorite ? '#ff6b6b' : null}
        />
      )}
    </IconButton>
  );
};

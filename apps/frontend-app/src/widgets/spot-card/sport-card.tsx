// SpotCard.tsx
import React from 'react';

import styles from './spot-card.module.css';
import { Spot } from '@app/enteties/spots';
import { SpotCard as BaseSpotCard } from '@app/enteties/spots';

interface SpotCardProps {
  spot: Spot;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

export const SpotCard: React.FC<SpotCardProps> = ({
  spot,
  className,
  onEdit,
  onDelete,
}) => {
  const header = (
    <>
      <h3 className={styles.title}>{spot.name}</h3>
      <div className={styles.actions}>
        {onEdit && (
          <button
            className={styles.editButton}
            onClick={() => onEdit(spot._id)}
            aria-label="Редактировать"
          >
            ✏️
          </button>
        )}
        {onDelete && (
          <button
            className={styles.deleteButton}
            onClick={() => onDelete(spot._id)}
            aria-label="Удалить"
          >
            🗑️
          </button>
        )}
      </div>
    </>
  );

  return <BaseSpotCard spot={spot} headerSlot={header} className={className} />;
};

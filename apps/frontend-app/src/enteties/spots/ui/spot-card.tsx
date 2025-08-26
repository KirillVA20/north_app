import React from 'react';
import styles from './spot-card.module.css';
import { Spot } from '@app/enteties/spots';
import { SpotCardInfo } from './spot-card-info';
import clsx from 'clsx';

interface SpotCardProps {
  spot: Spot;
  headerSlot?: React.ReactNode;
  className?: string;
}

export const SpotCard: React.FC<SpotCardProps> = ({
  spot,
  headerSlot,
  className,
}) => (
  <div className={clsx(styles.card, className)}>
    {headerSlot && <div className={styles.header}>{headerSlot}</div>}
    <SpotCardInfo spot={spot} />
  </div>
);

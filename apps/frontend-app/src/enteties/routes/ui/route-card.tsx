import { FC } from 'react';
import { Route } from '../model/types';
import styles from './route-card.module.css';
import { RouteCardInfo } from './route-card-info';
import clsx from 'clsx';

interface RouteCardProps {
  route: Route;
  className?: string;
  headerSlot?: React.ReactNode;
  bottomSlot?: React.ReactNode;
}

export const RouteCard: FC<RouteCardProps> = (props) => {
  const { route, className, headerSlot, bottomSlot } = props;

  return (
    <div className={clsx(styles.card, className)}>
      {headerSlot && <div className={styles.header}>{headerSlot}</div>}
      <RouteCardInfo route={route} />
      {bottomSlot && <div className={styles.bottom}>{bottomSlot}</div>}
    </div>
  );
};

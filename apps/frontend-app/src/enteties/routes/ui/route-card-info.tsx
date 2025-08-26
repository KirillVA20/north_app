import React from 'react';
import { Route } from '../index';
import styles from './route-card.module.css';
import { Text } from '@app/shared/ui/text';

interface RouteCardProps {
  route: Route;
}

export const RouteCardInfo: React.FC<RouteCardProps> = ({ route }) => {
  return (
    <>
      <Text size={20} weight="bold">
        {route.name}
      </Text>
      {route.description && <Text size={16}>{route.description}</Text>}
      <div className={styles.info}>
        <b>ID:</b> {route._id}
      </div>
      <div className={styles.info}>
        <b>Количество точек:</b> {route.points.length}
      </div>
      <div>
        <b>Точки маршрута:</b>
        <ol className={styles.pointsList}>
          {route.points.map((point, idx) => (
            <li key={idx} className={styles.pointItem}>
              <div>
                <span className={styles.pointLabel}>
                  <b>Координаты:</b>
                </span>{' '}
                {point.coordinates[0]}, {point.coordinates[1]}
              </div>
              {point.description && (
                <div>
                  <span className={styles.pointLabel}>
                    <b>Описание:</b>
                  </span>{' '}
                  {point.description}
                </div>
              )}
              {point.photo && (
                <div>
                  <span className={styles.pointLabel}>
                    <b>Фото:</b>
                  </span>{' '}
                  <a
                    href={point.photo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Смотреть
                  </a>
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </>
  );
};

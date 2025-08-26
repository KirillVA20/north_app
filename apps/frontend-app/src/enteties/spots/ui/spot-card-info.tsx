import React from 'react';
import styles from './spot-card.module.css';
import { Spot } from '@app/enteties/spots';

interface SpotCardInfoProps {
  spot: Spot;
}

export const SpotCardInfo: React.FC<SpotCardInfoProps> = ({ spot }) => {
  const { name, description, location, photos } = spot;
  const [lng, lat] = location.coordinates;

  return (
    <>
      {/* Координаты */}
      <div className={styles.coordinates}>
        <span>📍</span>
        <span>
          Широта: {lat.toFixed(6)}, Долгота: {lng.toFixed(6)}
        </span>
      </div>

      {/* Основное фото */}
      {photos?.[0] && (
        <img src={photos[0].url} alt={name} className={styles.mainImage} />
      )}

      {/* Описание */}
      {description && <p className={styles.description}>{description}</p>}

      {/* Дополнительные фото */}
      {photos && photos.length > 1 && (
        <div className={styles.additionalPhotos}>
          <h4>Дополнительные фото:</h4>
          <div className={styles.photoGrid}>
            {photos.slice(1).map((photo, index) => (
              <img
                key={index}
                src={photo.url}
                alt={`Фото места ${index + 2}`}
                className={styles.thumbnail}
              />
            ))}
          </div>
        </div>
      )}

      {/* Теги (раскомментировать при необходимости) */}
      {/* {tags && (
        <div className={styles.tags}>
          {tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              #{tag}
            </span>
          ))}
        </div>
      )} */}
    </>
  );
};

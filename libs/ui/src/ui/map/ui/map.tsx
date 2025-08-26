import {
  YMaps,
  Map as BaseMap,
  Placemark,
  Polyline,
} from '@pbe/react-yandex-maps';
import { FC, ReactNode } from 'react';
import styles from './map.module.scss';

const DEFAULT_CENTER = [67.568023, 33.407187];
const DEFAULT_ZOOM = 12;

type MapProps = {
  center?: [number, number];
  zoom?: number;
  width?: string | number;
  height?: string | number;
  polylineItems?: any[];
  pointItems?: {
    id?: string;
    coordinates: [number, number];
  }[];
  pointCoords?: [number, number];
  activePoint?: {};
  onMapClick?: (coords: [number, number]) => void;
  onPointClick?: (id: string) => void;
  onPolylineClick?: (id: string) => void;
  children?: ReactNode;
};

export const Map: FC<MapProps> = (props) => {
  const {
    onMapClick,
    onPolylineClick,
    center = DEFAULT_CENTER,
    zoom = DEFAULT_ZOOM,
    pointCoords,
    children,
    pointItems,
    polylineItems,
    width = '100%',
    height = '100%',
  } = props;

  return (
    <div className={styles.container}>
      <YMaps>
        <BaseMap
          defaultState={{
            center,
            zoom,
          }}
          width={width}
          height={height}
          onClick={(e) => {
            const coords = e.get('coords');
            onMapClick?.(coords);
          }}
        >
          <>
            {children}
            {pointCoords && (
              <Placemark
                geometry={pointCoords}
                options={{
                  preset: 'islands#icon',
                  iconColor: '#ff0000',
                }}
              />
            )}
            {pointItems?.map((point) => (
              <Placemark
                key={point.id}
                geometry={point.coordinates}
                options={{
                  preset: 'islands#icon',
                  iconColor: '#ff0000',
                }}
              />
            ))}
            {polylineItems?.map((polyline, index) => (
              <Polyline
                key={index}
                geometry={polyline.points.map((point) => point.coordinates)}
                onClick={() => onPolylineClick?.(polyline.id)}
                options={{
                  strokeColor: '#228B22',
                  strokeWidth: 4,
                }}
              />
            ))}
          </>
        </BaseMap>
      </YMaps>
    </div>
  );
};

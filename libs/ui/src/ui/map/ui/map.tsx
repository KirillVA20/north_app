import {
  YMaps,
  Map as BaseMap,
  Placemark,
  Polyline,
} from '@pbe/react-yandex-maps';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import styles from './map.module.scss';
import { YMapsApi } from '@pbe/react-yandex-maps/typings/util/typing';

const DEFAULT_CENTER = [67.568023, 33.407187];
const DEFAULT_ZOOM = 12;

type MapProps = {
  center?: [number, number];
  zoom?: number;
  width?: string | number;
  height?: string | number;
  polylineItems?: { id?: string; coordinates: [number, number] }[];
  pointItems?: { id?: string; coordinates: [number, number] }[];
  pointCoords?: [number, number];
  activePoint?: {};
  onMapClick?: (coords: [number, number]) => void;
  onPointClick?: (id: string) => void;
  onPolylineClick?: (id: string) => void;
  onPlacemarkDragend?: (coords: [number, number], index: number) => void;
  onPlaceMarkClick?: (index: number) => void;
  draggablePoints?: boolean;
  children?: ReactNode;
};

export const Map: FC<MapProps> = (props) => {
  const {
    onMapClick,
    onPlacemarkDragend,
    onPlaceMarkClick,
    center = DEFAULT_CENTER,
    zoom = DEFAULT_ZOOM,
    pointCoords,
    children,
    pointItems,
    polylineItems,
    width = '100%',
    height = '100%',
    draggablePoints = false,
  } = props;

  const handleInstanceRef = (ref: ymaps.Map, index: number) => {
    if (ref) {
      ref.events.add('dragend', (e) => {
        const coords = e.get('target').geometry.getCoordinates();
        onPlacemarkDragend?.(coords, index);
      });

      ref.events.add('click', (e) => {
        onPlaceMarkClick?.(index);
      });
    }
  };

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

            {pointItems?.map((point, index) => (
              <Placemark
                key={point.coordinates[0]}
                geometry={point.coordinates}
                options={{
                  preset: 'islands#circleIcon',
                  iconColor: '#000',
                  draggable: draggablePoints,
                }}
                instanceRef={(ref) => handleInstanceRef(ref, index)}
              />
            ))}
            <Polyline
              geometry={polylineItems?.map(({ coordinates }) => coordinates)}
              options={{
                strokeColor: '#FC830B',
                strokeWidth: 4,
              }}
            />
            {pointCoords && (
              <Placemark
                geometry={pointCoords}
                options={{
                  preset: 'islands#circleDotIcon',
                  iconColor: '#000',
                }}
              />
            )}
          </>
        </BaseMap>
      </YMaps>
    </div>
  );
};

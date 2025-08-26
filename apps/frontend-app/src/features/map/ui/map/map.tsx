import React from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

type YandexMapProps = {
  onMapClick?: (e: any) => void;
  items?: any[];
};

const YandexMap = (props: YandexMapProps) => {
  const { items } = props;
  return (
    <YMaps>
      <Map
        defaultState={{
          center: [67.568023, 33.407187],
          zoom: 14,
        }}
        width="100%"
        height="100%"
      >
        {items.map((item) => (
          <Placemark
            key={item.id}
            geometry={item.location}
            properties={{
              balloonContent: `<strong>${item.title}</strong><br>${item.description}`,
            }}
            options={{
              preset: 'islands#icon',
              iconColor: '#0095b6',
            }}
          />
        ))}
        {/* Example static placemark */}
      </Map>
    </YMaps>
  );
};

export default YandexMap;

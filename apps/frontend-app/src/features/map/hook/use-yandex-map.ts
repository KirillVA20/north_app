import { Reactify } from '@yandex/ymaps3-types/reactify';
import React, { useState } from 'react';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';

export const useYandexMap = () => {
  const [reactify, setReactify] = useState<Reactify>(null);

  useEffect(() => {});

  const initYmaps3React = async () => {
    const [ymaps3React] = await Promise.all([
      ymaps3.import('@yandex/ymaps3-reactify'),
      ymaps3.ready,
    ]);
    const reactify = ymaps3React.reactify.bindTo(React, ReactDOM);
    setReactify(reactify);
  };

  const { YMap, YMapDefaultSchemeLayer, YMapControls, YMapControl } = reactify
    ? reactify.module(ymaps3)
    : {};

  return {
    YMap,
    YMapDefaultSchemeLayer,
    YMapControls,
    YMapControl,
  };
};

import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  selectActionMode,
  selectGuideMode,
} from '@app/shared/store/slices/app-slice';
import {
  useDeleteSpotMutation,
  useGetSpotsQuery,
} from '@app/enteties/spots/api/spots-api';
import { useGetRoutesQuery } from '@app/enteties/routes';
import { Spot } from '@app/enteties/spots';
import { Route } from '@app/enteties/routes';

export function useGuideMapLogic() {
  const { data: spotsData = [] } = useGetSpotsQuery({});
  const { data: routeData = [] } = useGetRoutesQuery();
  const [deleteSpot] = useDeleteSpotMutation();

  const actionMode = useSelector(selectActionMode);
  const guideMode = useSelector(selectGuideMode);

  const [newPointCoords, setNewPointCoords] = useState<number[] | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);
  const [activeRoute, setActiveRoute] = useState<Route | null>(null);
  const [activePoint, setActivePoint] = useState<[number, number] | null>(null);
  const [coordinates, setCoordinates] = useState<[number, number][] | null>();

  const handleDeleteSpot = async (id: string) => {
    try {
      await deleteSpot(id).unwrap();
      setSelectedSpot(null);
    } catch (err) {
      console.error('Ошибка удаления:', err);
    }
  };

  const hadleRouteMapClick = (coordinates: [number, number]) => {
    setCoordinates((prev) => {
      if (prev) {
        return [...prev, coordinates];
      }
      return [coordinates];
    });
  };

  const handlePointMapClick = (coordinates: [number, number]) => {
    setNewPointCoords(coordinates);
  };

  const onMapClickHandler = (coordinates: [number, number]) => {
    if (actionMode === 'show') return;
    if (guideMode === 'route') {
      hadleRouteMapClick(coordinates);
      return;
    }
    if (guideMode === 'point') {
      handlePointMapClick(coordinates);
      return;
    }
  };

  const spots = spotsData?.map(({ _id, location }) => ({
    id: _id,
    coordinates: location.coordinates,
  }));
  const routes = routeData?.map(({ _id, points }) => ({
    id: _id,
    points,
  }));

  return {
    actionMode,
    guideMode,
    newPointCoords,
    setNewPointCoords,
    selectedSpot,
    setSelectedSpot,
    activeRoute,
    setActiveRoute,
    activePoint,
    setActivePoint,
    coordinates,
    setCoordinates,
    handleDeleteSpot,
    onMapClickHandler,
    spots,
    routes,
  };
}

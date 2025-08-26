import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectActionMode } from '@app/shared/store/slices/app-slice';
import { RouteCard, useGetRoutesQuery } from '@app/enteties/routes';
import { Route } from '@app/enteties/routes';
import { CreateRouteForm } from '@app/features/routes/ui/create-route-form/create-route-form';

export function useGuideRoutes() {
  const { data: routeData = [] } = useGetRoutesQuery();
  const actionMode = useSelector(selectActionMode);

  const [activeRoute, setActiveRoute] = useState<Route | null>(null);
  const [activePoint, setActivePoint] = useState<[number, number] | null>(null);
  const [coordinates, setCoordinates] = useState<[number, number][] | null>();

  const handleRouteMapClick = (coordinates: [number, number]) => {
    setCoordinates((prev) => {
      if (prev) {
        return [...prev, coordinates];
      }
      return [coordinates];
    });
  };

  const onMapClickHandler = (coordinates: [number, number]) => {
    if (actionMode === 'show') return;
    handleRouteMapClick(coordinates);
  };

  const onPolyLineClick = (id: string) => {
    const activeRoute = routeData.find(({ _id }) => id === _id);

    if (activeRoute) setActiveRoute(activeRoute);
  };

  const routes = routeData?.map(({ _id, points }) => ({
    id: _id,
    points,
  }));

  const routeForm = coordinates ? (
    <CreateRouteForm
      coordinates={coordinates}
      onSuccess={() => setCoordinates(null)}
    />
  ) : null;

  const routeCard = activeRoute ? <RouteCard route={activeRoute} /> : null;

  return {
    activeRoute,
    setActiveRoute,
    activePoint,
    setActivePoint,
    coordinates,
    setCoordinates,
    onMapClickHandler,
    onPolyLineClick,
    routeForm,
    routeCard,
    routes,
  };
}

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectActionMode } from '@app/shared/store/slices/app-slice';
import {
  useDeleteSpotMutation,
  useGetSpotsQuery,
} from '@app/enteties/spots/api/spots-api';
import { Spot } from '@app/enteties/spots';
import { SpotCard } from '@app/widgets/spot-card/sport-card';
import { CreateSpotForm } from '@app/features/spots/spot-form/spot-form';

export function useGuidePoints() {
  const { data: spotsData = [] } = useGetSpotsQuery({});
  const [deleteSpot] = useDeleteSpotMutation();
  const actionMode = useSelector(selectActionMode);

  const [newPointCoords, setNewPointCoords] = useState<number[] | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);

  const handleDeleteSpot = async (id: string) => {
    try {
      await deleteSpot(id).unwrap();
      setSelectedSpot(null);
    } catch (err) {
      console.error('Ошибка удаления:', err);
    }
  };

  const handlePointMapClick = (coordinates: [number, number]) => {
    setNewPointCoords(coordinates);
  };

  const onMapClickHandler = (coordinates: [number, number]) => {
    if (actionMode === 'show') return;
    handlePointMapClick(coordinates);
  };

  const onPointClick = (id: string) => {
    const activePoint = spotsData.find(({ _id }) => id === _id);

    if (activePoint) setSelectedSpot(activePoint);
  };

  const spots = spotsData?.map(({ _id, location }) => ({
    id: _id,
    coordinates: location.coordinates,
  }));

  const sportCard = selectedSpot ? (
    <SpotCard spot={selectedSpot} onDelete={handleDeleteSpot} />
  ) : null;

  const spotForm = newPointCoords ? (
    <CreateSpotForm
      lng={newPointCoords[0]}
      lat={newPointCoords[1]}
      onSuccess={() => setNewPointCoords(null)}
    />
  ) : null;

  return {
    newPointCoords,
    setNewPointCoords,
    selectedSpot,
    setSelectedSpot,
    handleDeleteSpot,
    onMapClickHandler,
    onPointClick,
    spots,
    sportCard,
    spotForm,
  };
}

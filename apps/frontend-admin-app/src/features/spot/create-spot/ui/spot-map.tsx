import { Box, Button, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Map } from '@test/ui';
import { PathPointType } from '@/enteties/spot/model/schema/spot.schema';
import { Switch } from '@/shared/ui';

type SpotMapProps = {
  onAddPoint: (coords: [number, number]) => void;
  onPathChange: (path: PathPointType[]) => void;
};

export const SpotMap = ({ onAddPoint, onPathChange }: SpotMapProps) => {
  const [isPathMode, setPathMode] = useState(false);
  const [path, setPath] = useState<PathPointType[]>([]);
  const [point, setPoint] = useState<[number, number]>();

  useEffect(() => {
    onPathChange(path);
  }, [path, onPathChange]);

  const onMapClick = (coords: [number, number]) => {
    if (isPathMode) {
      addsToPath(coords);
    } else {
      addsPoint(coords);
    }
  };

  const addsPoint = (coords: [number, number]) => {
    onAddPoint(coords);
    setPoint(coords);
  };

  const addsToPath = (coords: [number, number]) => {
    const point = {
      coordinates: coords,
      id: coords.toString(),
    };
    setPath((prev) => [...prev, point]);
  };

  const changeCoordsForPathPoint = (
    coords: [number, number],
    index: number
  ) => {
    const prevPath = path.slice();
    prevPath[index].coordinates = coords;

    setPath(prevPath);
  };

  const removePathPoint = (index: number) => {
    const prevPath = path.slice();
    prevPath.splice(index, 1);

    setPath(prevPath);
  };

  const onChangePathMode = (mode: boolean) => {
    if (mode) {
      setPathMode(true);
    } else {
      setPathMode(false);
      setPath([]);
    }
  };

  return (
    <>
      {!!point && (
        <Flex gap={4} flexDirection="column">
          <Switch
            checked={isPathMode}
            onCheckedChange={onChangePathMode}
            label={isPathMode ? 'Спрятать путь' : 'Добавить путь'}
          />
        </Flex>
      )}

      <Box borderRadius={8} overflow="hidden">
        <Map
          height={400}
          onMapClick={onMapClick}
          polylineItems={path}
          pointItems={path}
          pointCoords={point}
          onPlacemarkDragend={changeCoordsForPathPoint}
          onPlaceMarkClick={removePathPoint}
          draggablePoints={isPathMode}
        />
      </Box>
    </>
  );
};

import { Card, Image } from '@chakra-ui/react';
import type { Spot } from '../model/types';

type SpotCardProps = {
  spot: Spot;
  onClick?: () => void;
};

export const SpotCard = ({ spot, onClick }: SpotCardProps) => {
  return (
    <Card.Root overflow="hidden" onClick={() => onClick?.()}>
      {spot.previewImageUrl ? (
        <Image
          src={spot.previewImageUrl}
          alt={spot.name}
          objectFit="cover"
          width="100%"
          height="160px"
        />
      ) : null}
      <Card.Body>
        <Card.Title>{spot.name}</Card.Title>
        {spot.description ? (
          <Card.Description lineClamp={5}>{spot.description}</Card.Description>
        ) : null}
      </Card.Body>
    </Card.Root>
  );
};

import { Card, Image } from '@chakra-ui/react';
import type { Spot } from '../model/types';

type SpotCardProps = {
  spot: Spot;
  onClick?: () => void;
};

const { Root, Body, Title, Description } = Card;

export const SpotCard = ({ spot, onClick }: SpotCardProps) => {
  return (
    <Root as="article" overflow="hidden" onClick={() => onClick?.()}>
      {spot.previewImageUrl ? (
        <Image
          src={spot.previewImageUrl}
          alt="Spot preview"
          objectFit="cover"
          width="100%"
          height="160px"
        />
      ) : null}
      <Body>
        <Title>{spot.name}</Title>
        {spot.description ? (
          <Description lineClamp={5}>{spot.description}</Description>
        ) : null}
      </Body>
    </Root>
  );
};

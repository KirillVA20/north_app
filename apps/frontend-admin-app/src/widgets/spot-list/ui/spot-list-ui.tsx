import { SimpleGrid, Spinner, HStack } from '@chakra-ui/react';
import { Spot, SpotCard } from '@/enteties/spot';
import { AlertMessage } from '@test/ui';

type SpotListUIProps = {
  data: Spot[] | undefined;
  isPending: boolean;
  isError: boolean;
  onSpotSelect?: (spot: Spot) => void;
  onRefetch: () => void;
};

export const SpotListUI = ({
  data,
  isPending,
  isError,
  onSpotSelect,
  onRefetch,
}: SpotListUIProps) => {
  if (isPending) {
    return (
      <HStack>
        <Spinner size="sm" />
        <span>Загрузка спотов…</span>
      </HStack>
    );
  }

  if (isError) {
    return (
      <AlertMessage
        status="error"
        title="Не удалось загрузить споты."
        actionLabel="Повторить"
        onActionClick={() => onRefetch()}
      />
    );
  }

  if (!data || data.length === 0) {
    return <AlertMessage status="info" title="Споты не найдены" />;
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4} width="100%">
      {data.map((spot) => (
        <SpotCard
          key={spot.id}
          spot={spot}
          onClick={() => onSpotSelect?.(spot)}
        />
      ))}
    </SimpleGrid>
  );
};

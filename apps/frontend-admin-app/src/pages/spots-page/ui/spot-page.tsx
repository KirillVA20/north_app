import { Spot } from '@/enteties/spot';
import { Modal } from '@test/ui';
import { SpotInfoCard } from '@/widgets/spot-info-card';
import {
  AllSpotsList,
  FavoriteSpotsList,
  UserSpotList,
} from '@/widgets/spot-list';
import { Tabs, Wrap } from '@chakra-ui/react';
import { useState } from 'react';

export const SpotPage = () => {
  const [spotInView, setSpotInView] = useState<Spot | null>(null);

  return (
    <Wrap gap={`10px`} width="100%">
      <Tabs.Root defaultValue="all" variant="enclosed">
        <Tabs.List>
          <Tabs.Trigger value="all">Все</Tabs.Trigger>
          <Tabs.Trigger value="created">Созданные</Tabs.Trigger>
          <Tabs.Trigger value="saved">Сохраненные</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="created">
          <UserSpotList onSpotSelect={setSpotInView} />
        </Tabs.Content>

        <Tabs.Content value="all">
          <AllSpotsList onSpotSelect={setSpotInView} />
        </Tabs.Content>

        <Tabs.Content value="saved">
          <FavoriteSpotsList onSpotSelect={setSpotInView} />
        </Tabs.Content>
      </Tabs.Root>

      <Modal open={!!spotInView} onClose={() => setSpotInView(null)}>
        {spotInView && (
          <SpotInfoCard
            onDelete={() => setSpotInView(null)}
            spotData={spotInView}
          />
        )}
      </Modal>
    </Wrap>
  );
};

import { Spot } from '@/enteties/spot';
import { CreateSpotForm } from '@/features/spot/create-spot';
import { Modal } from '@test/ui';
import { SpotInfoCard } from '@/widgets/spot-info-card';
import { SpotList } from '@/widgets/spot-list';
import { Button, Wrap } from '@chakra-ui/react';
import { useState } from 'react';

export const SpotPage = () => {
  const [spotInView, setSpotInView] = useState<Spot | null>(null);
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
  };

  return (
    <Wrap gap={`10px`} width="100%">
      <SpotList onSpotSelect={setSpotInView} />
      <Button onClick={() => setOpen(true)} mb={4}>
        Добавить точку
      </Button>
      <Modal open={open} onOpenChange={setOpen} title="Новая точка">
        <CreateSpotForm onSuccess={handleSuccess} />
      </Modal>
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

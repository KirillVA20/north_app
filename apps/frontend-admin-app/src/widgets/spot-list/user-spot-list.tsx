import { Spot, useSpotsByUserId } from '@/enteties/spot';
import { useUserProfile } from '@/features/auth';
import { SpotListUI } from './ui/spot-list-ui';
import { Button, Wrap } from '@chakra-ui/react';
import { CreateSpot } from '@/features/spot/create-spot';
import { Modal } from '@test/ui';
import { useState } from 'react';

type SpotListProps = {
  onSpotSelect?: (spot: Spot) => void;
};

export const UserSpotList = ({ onSpotSelect }: SpotListProps) => {
  const { data: userData } = useUserProfile();
  const { data, isPending, isError, refetch } = useSpotsByUserId(
    userData?.id || ''
  );

  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
  };

  return (
    <Wrap gap={`10px`} width="100%">
      <SpotListUI
        data={data}
        isPending={isPending}
        isError={isError}
        onSpotSelect={onSpotSelect}
        onRefetch={refetch}
      />
      <Button onClick={() => setOpen(true)} mb={4}>
        Добавить точку
      </Button>
      <Modal open={open} onOpenChange={setOpen} title="Новая точка">
        <CreateSpot onSuccess={handleSuccess} />
      </Modal>
    </Wrap>
  );
};

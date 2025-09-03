import { CreateSpotSchemaType, useSpotCreate } from '@/enteties/spot';
import { CreateSpotForm } from '../ui/create-spot-form';

type CreateSpotProps = {
  onSuccess?: () => void;
};

export const CreateSpot = ({ onSuccess }: CreateSpotProps) => {
  const { createSpot, isPending } = useSpotCreate();

  const onSubmit = (values: CreateSpotSchemaType) => {
    createSpot(values, {
      onSuccess: () => {
        onSuccess?.();
      },
    });
  };

  return <CreateSpotForm onSubmit={onSubmit} isLoading={isPending} />;
};

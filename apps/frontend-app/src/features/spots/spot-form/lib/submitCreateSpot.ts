import { useCreateSpotMutation } from '@app/enteties/spots/api/spots-api';
import { z } from 'zod';
import { CreateSpotSchema } from '@app/enteties/spots/model/schema';

export const useSubmitCreateSpot = (onSuccess?: () => void) => {
  const [createSpot, { isLoading }] = useCreateSpotMutation();

  const onSubmit = async (data: z.infer<typeof CreateSpotSchema>) => {
    try {
      const payload = {
        name: data.name,
        description: data.description,
        lng: data.lng,
        lat: data.lat,
      };
      await createSpot(payload).unwrap();
      onSuccess?.();
    } catch (err) {
      console.error('Ошибка создания:', err);
    }
  };

  return { onSubmit, isLoading };
};

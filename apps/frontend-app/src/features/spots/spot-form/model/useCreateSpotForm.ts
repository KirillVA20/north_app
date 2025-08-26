import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateSpotSchema } from '@app/enteties/spots/model/schema';
import { z } from 'zod';

export const useCreateSpotForm = (lng: number, lat: number) => {
  return useForm<z.infer<typeof CreateSpotSchema>>({
    resolver: zodResolver(CreateSpotSchema),
    defaultValues: { lng, lat },
  });
};

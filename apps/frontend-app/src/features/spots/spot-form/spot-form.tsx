import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateSpotMutation } from '@app/enteties/spots/api/spots-api';
import { CreateSpotSchema } from '@app/enteties/spots/model/schema';
import { z } from 'zod';
import Text from '@app/shared/ui/text';
import { Input } from '@app/shared/ui/input';
import { Button } from '@app/shared/ui/Button';

interface CreateSpotFormProps {
  lng: number;
  lat: number;
  onSuccess?: () => void;
  className?: string;
}

export const CreateSpotForm = ({
  lng,
  lat,
  onSuccess,
  className,
}: CreateSpotFormProps) => {
  const [createSpot, { isLoading }] = useCreateSpotMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof CreateSpotSchema>>({
    resolver: zodResolver(CreateSpotSchema),
    defaultValues: {
      lng,
      lat,
    },
  });

  const onSubmit = async (data: z.infer<typeof CreateSpotSchema>) => {
    try {
      // Преобразуем данные в нужный формат (без FormData)
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      <Text>Создать новую точку</Text>

      <Input
        id="username"
        type="text"
        isError={!!errors.name}
        message={errors.name?.message}
        {...register('name')}
      />

      <Input
        id="description"
        type="text"
        isError={!!errors.description}
        message={errors.description?.message}
        {...register('description')}
      />

      <div>
        <Input
          id="lng"
          type="text"
          placeholder="Долгота"
          isError={!!errors.description}
          message={errors.description?.message}
          disabled
          value={lng}
          {...register('lng')}
        />
        <Input
          id="lat"
          type="text"
          placeholder="Широта"
          isError={!!errors.description}
          message={errors.description?.message}
          disabled
          value={lat}
          {...register('lat')}
        />
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Создание...' : 'Создать точку'}
      </Button>
    </form>
  );
};

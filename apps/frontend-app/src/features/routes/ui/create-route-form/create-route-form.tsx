import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateRouteMutation } from '@app/enteties/routes';
import { z } from 'zod';
import { Input } from '@app/shared/ui/input';
import Text from '@app/shared/ui/text';
import { Button } from '@app/shared/ui/Button';
import { CreateRouteDto } from '@app/enteties/routes/model/types';

type CreateRouteFormProps = {
  coordinates: [number, number][];
  onSuccess?: () => void;
};

const FormRouteSchema = z.object({
  name: z.string().min(1, 'Название обязательно'),
  description: z.string().optional(),
});

type FormRouteSchema = z.infer<typeof FormRouteSchema>;

export const CreateRouteForm = ({
  coordinates,
  onSuccess,
}: CreateRouteFormProps) => {
  const [createRoute, { isLoading }] = useCreateRouteMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormRouteSchema>({
    resolver: zodResolver(FormRouteSchema),
  });

  const onSubmit = async (data: FormRouteSchema) => {
    const routePoints = coordinates.map((coordinate) => ({
      coordinates: coordinate,
      description: '',
      photo: '',
    }));
    await createRoute({ ...data, points: routePoints });
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Text>Создать новую точку</Text>

      {/* Поле названия (обязательное) */}
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

      {coordinates.map(([lng, lat], index) => (
        <div key={index}>
          <Input
            type="text"
            placeholder="Долгота"
            isError={!!errors.description}
            message={errors.description?.message}
            disabled
            value={lng}
          />
          <Input
            type="text"
            placeholder="Широта"
            isError={!!errors.description}
            message={errors.description?.message}
            disabled
            value={lat}
          />
        </div>
      ))}

      {/* Кнопка отправки */}
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Создание...' : 'Создать точку'}
      </Button>
    </form>
  );
};

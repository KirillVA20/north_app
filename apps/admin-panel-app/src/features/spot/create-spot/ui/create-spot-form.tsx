import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Stack,
  Input,
  Field,
  Textarea,
  Box,
  Flex,
  Image,
} from '@chakra-ui/react';
import { Map } from '@test/ui';

import {
  useSpotCreate,
  CreateSpotSchema,
  type CreateSpotSchemaType,
} from '@/enteties/spot';

type CreateSpotFormProps = {
  onSuccess?: () => void;
};

const DEFAULT_VALUE: Partial<CreateSpotSchemaType> = {
  name: '',
  description: '',
  previewImageUrl: '',
};

export const CreateSpotForm = ({ onSuccess }: CreateSpotFormProps) => {
  const form = useForm<CreateSpotSchemaType>({
    resolver: zodResolver(CreateSpotSchema),
    defaultValues: DEFAULT_VALUE,
    mode: 'onTouched',
  });

  const lng = form.watch('lng');
  const lat = form.watch('lat');
  const previewImageUrl = form.watch('previewImageUrl');

  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  const { createSpot, isPending } = useSpotCreate();

  const onSubmit = handleSubmit((values) => {
    createSpot(values, {
      onSuccess: () => {
        reset();
        onSuccess?.();
      },
    });
  });

  const onMapClick = (coords: [number, number]) => {
    const [lng, lat] = coords;
    form.setValue('lng', lng);
    form.setValue('lat', lat);
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack gap={3}>
        <Field.Root invalid={!!errors.name}>
          <Field.Label>Название</Field.Label>
          <Input {...register('name')} />
          {errors.name ? (
            <Field.ErrorText>{errors.name.message}</Field.ErrorText>
          ) : null}
        </Field.Root>
        <Field.Root invalid={!!errors.previewImageUrl}>
          <Field.Label>URL превью-изображения</Field.Label>
          <Input
            type="url"
            placeholder="https://..."
            {...register('previewImageUrl')}
          />
          {errors.previewImageUrl ? (
            <Field.ErrorText>{errors.previewImageUrl.message}</Field.ErrorText>
          ) : null}
        </Field.Root>

        <Box
          borderRadius={8}
          overflow="hidden"
          height={previewImageUrl ? 300 : 0}
          transition="height .3s"
        >
          {previewImageUrl && (
            <Image
              src={previewImageUrl}
              width="100%"
              height={300}
              objectFit="cover"
            />
          )}
        </Box>

        <Flex gap={8}>
          <Field.Root invalid={!!errors.lng}>
            <Field.Label>Долгота (lng)</Field.Label>
            <Input
              type="number"
              step="any"
              readOnly
              {...register('lng', { valueAsNumber: true })}
            />
            {errors.lng ? (
              <Field.ErrorText>{errors.lng.message}</Field.ErrorText>
            ) : null}
          </Field.Root>

          <Field.Root invalid={!!errors.lat}>
            <Field.Label>Широта (lat)</Field.Label>
            <Input
              type="number"
              step="any"
              readOnly
              {...register('lat', { valueAsNumber: true })}
            />
            {errors.lat ? (
              <Field.ErrorText>{errors.lat.message}</Field.ErrorText>
            ) : null}
          </Field.Root>
        </Flex>

        <Box borderRadius={8} overflow="hidden">
          <Map height={400} onMapClick={onMapClick} pointCoords={[lng, lat]} />
        </Box>

        <Field.Root>
          <Field.Label>Описание</Field.Label>
          <Textarea rows={3} {...register('description')} />
        </Field.Root>

        <Button type="submit" loading={isPending} disabled={isPending}>
          Создать точку
        </Button>
      </Stack>
    </form>
  );
};

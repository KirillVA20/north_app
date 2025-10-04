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

import { CreateSpotSchema, type CreateSpotSchemaType } from '@/enteties/spot';
import { useState } from 'react';
import { PathPointType } from '@/enteties/spot/model/schema/spot.schema';
import { SpotMap } from './spot-map';

type CreateSpotFormProps = {
  onSubmit: (values?: CreateSpotSchemaType) => void;
  isLoading?: boolean;
};

const DEFAULT_VALUE: Partial<CreateSpotSchemaType> = {
  name: '',
  description: '',
  previewImageUrl: '',
};

export const CreateSpotForm = ({
  onSubmit,
  isLoading,
}: CreateSpotFormProps) => {
  const form = useForm<CreateSpotSchemaType>({
    resolver: zodResolver(CreateSpotSchema),
    defaultValues: DEFAULT_VALUE,
    mode: 'onTouched',
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const [path, setPath] = useState<PathPointType[]>([]);

  const previewImageUrl = form.watch('previewImageUrl');

  const addsPointToForm = (coords: [number, number]) => {
    const [lng, lat] = coords;
    form.setValue('lng', lng);
    form.setValue('lat', lat);
  };

  const onSubmitHandler = handleSubmit((values: CreateSpotSchemaType) => {
    onSubmit({ ...values, path });
  });

  return (
    <form onSubmit={onSubmitHandler}>
      <Stack gap={3}>
        <Field.Root invalid={!!errors.name}>
          <Field.Label>Название</Field.Label>
          <Input {...register('name')} data-testid="name" />
          {errors.name ? (
            <Field.ErrorText>{errors.name.message}</Field.ErrorText>
          ) : null}
        </Field.Root>
        <Field.Root invalid={!!errors.previewImageUrl}>
          <Field.Label>URL превью-изображения</Field.Label>
          <Input
            type="url"
            placeholder="https://..."
            data-testid="preview-image"
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
              data-testid="lng"
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
              data-testid="lat"
              readOnly
              {...register('lat', { valueAsNumber: true })}
            />
            {errors.lat ? (
              <Field.ErrorText>{errors.lat.message}</Field.ErrorText>
            ) : null}
          </Field.Root>
        </Flex>

        <SpotMap onAddPoint={addsPointToForm} onPathChange={setPath} />

        <Field.Root>
          <Field.Label>Описание</Field.Label>
          <Textarea
            data-testid="description"
            rows={3}
            {...register('description')}
          />
        </Field.Root>

        <Button
          name="submit"
          type="submit"
          loading={isLoading}
          disabled={isLoading}
        >
          Создать точку
        </Button>
      </Stack>
    </form>
  );
};

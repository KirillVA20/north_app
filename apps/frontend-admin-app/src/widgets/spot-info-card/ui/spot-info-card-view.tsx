import { Box, Stack, Text, Image, Flex, IconButton } from '@chakra-ui/react';
import { Switch } from '@/shared/ui';
import { Map, DeleteIcon } from '@test/ui';
import { useState } from 'react';
import { PathPointType } from '@/enteties/spot/model/schema/spot.schema';

export type SpotInfoCardViewProps = {
  name: string;
  description?: string;
  previewImageUrl?: string;
  lng: number;
  lat: number;
  path: PathPointType[];
  author?: string;
  isPending?: boolean;
  onDelete?: () => void;
  toFavoriteNode: React.ReactNode;
};

export const SpotInfoCardView = ({
  name,
  description,
  previewImageUrl,
  lng,
  lat,
  author,
  path,
  isPending,
  onDelete,
  toFavoriteNode,
}: SpotInfoCardViewProps) => {
  const [showPath, setShowPath] = useState(false);

  return (
    <Stack gap={6} maxWidth="800px" mx="auto">
      <Text fontSize="xl" fontWeight="bold">
        {name}
      </Text>
      {previewImageUrl && (
        <Image
          src={previewImageUrl}
          width="100%"
          height={300}
          objectFit="cover"
          borderRadius={8}
        />
      )}

      {description && (
        <Box>
          <Text>{description}</Text>
        </Box>
      )}

      <Flex flexDirection="column" gap={5}>
        <Flex justifyContent="space-between">
          <Text fontWeight="semibold">Расположение:</Text>
          {!!path?.length && (
            <Switch
              checked={showPath}
              onCheckedChange={setShowPath}
              label={showPath ? 'Спрятать путь' : 'Показать путь'}
            />
          )}
        </Flex>
        <Box borderRadius={8} overflow="hidden">
          <Map
            polylineItems={showPath && path ? path : []}
            pointItems={showPath && path ? path : []}
            height={400}
            center={[lng, lat]}
            pointCoords={[lng, lat]}
          />
        </Box>
      </Flex>

      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          {author && (
            <Text fontSize="sm" color="gray.500">
              Автор: {author}
            </Text>
          )}
        </Box>
        <Flex justifyContent={'flex-end'} gap={3}>
          {toFavoriteNode}
          <IconButton
            colorScheme="red"
            variant="surface"
            onClick={onDelete}
            loading={isPending}
            disabled={isPending}
          >
            <DeleteIcon />
          </IconButton>
        </Flex>
      </Flex>
    </Stack>
  );
};

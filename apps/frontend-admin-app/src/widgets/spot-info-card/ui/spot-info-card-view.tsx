import { Box, Stack, Text, Image, Flex, IconButton } from '@chakra-ui/react';
import { Map, FavoriteIcon, DeleteIcon } from '@test/ui';

export type SpotInfoCardViewProps = {
  name: string;
  description?: string;
  previewImageUrl?: string;
  lng: number;
  lat: number;
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
  isPending,
  onDelete,
  toFavoriteNode,
}: SpotInfoCardViewProps) => (
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

    <Box>
      <Text fontWeight="semibold">Расположение:</Text>
      <Box borderRadius={8} overflow="hidden">
        <Map height={400} center={[lng, lat]} pointCoords={[lng, lat]} />
      </Box>
    </Box>

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

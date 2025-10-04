import { Box, Flex } from '@chakra-ui/react';

type PointStepsProps = {
  steps: number;
};

export const PointSteps = () => {
  return (
    <Box overflowX="auto" width="100%">
      <Flex justifyContent="space-between"></Flex>
    </Box>
  );
};

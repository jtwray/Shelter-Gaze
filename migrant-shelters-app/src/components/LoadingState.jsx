import React from 'react';
import { Box, Flex } from '@radix-ui/themes';
import { LoadingSkeleton } from './LoadingSkeleton';

export const LoadingState = () => {
  return (
    <Flex direction="column" gap="4" p="4">
      {[1, 2, 3].map((i) => (
        <Box key={i} style={{ opacity: 1 - i * 0.2 }}>
          <LoadingSkeleton height={200} />
        </Box>
      ))}
    </Flex>
  );
};
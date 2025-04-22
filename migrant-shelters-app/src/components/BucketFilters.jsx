import React, { useCallback, memo } from 'react';
import { Flex, Badge, Text } from '@radix-ui/themes';
import { PRIORITY_BUCKETS, BUCKET_LABELS } from '../utils/servicebuckets';

export const BucketFilters = memo(({ activeBuckets, onBucketChange }) => {
  // Bucket theme colors
  const bucketColors = {
    shelter: "blue",
    food: "green",
    hygiene: "orange",
    health: "red",
    caseMgmt: "purple",
    employment: "mint",
    housing: "cyan",
    community: "yellow"
  };
  
  // Get bucket count (memoize this in a real app for large datasets)
  const getBucketCount = (bucketName) => {
    return PRIORITY_BUCKETS[bucketName].size;
  };

  // Handle bucket click with event stopping
  const handleBucketClick = useCallback((e, bucketName) => {
    e.stopPropagation();
    onBucketChange(bucketName);
  }, [onBucketChange]);

  // Sort buckets by priority
  const sortedBuckets = Object.keys(PRIORITY_BUCKETS);

  return (
    <Flex direction="column" gap="2">
      <Text size="2" color="gray" mb="1">Filter by Category:</Text>
      <Flex gap="2" wrap="wrap">
        {sortedBuckets.map((bucketName) => (
          <Badge
            key={bucketName}
            variant={activeBuckets.includes(bucketName) ? "solid" : "soft"}
            color={bucketColors[bucketName] || "gray"}
            style={{
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              transform: activeBuckets.includes(bucketName) ? 'scale(1.05)' : 'scale(1)',
              fontWeight: 500,
              // Use hardware acceleration
              willChange: 'transform',
            }}
            onClick={(e) => handleBucketClick(e, bucketName)}
          >
            {BUCKET_LABELS[bucketName]} ({getBucketCount(bucketName)})
          </Badge>
        ))}
      </Flex>
    </Flex>
  );
});
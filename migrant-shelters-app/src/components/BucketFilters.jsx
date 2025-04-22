import React from 'react';
import { Flex, Badge, Text } from '@radix-ui/themes';
import { PRIORITY_BUCKETS, BUCKET_LABELS } from '../utils/servicebuckets';

export const BucketFilters = ({ activeBuckets, onBucketChange }) => {
  // Bucket theme colors - use consistent colors for categories
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
  
  // Count how many shelters offer services in each bucket
  const getBucketCount = (bucketName) => {
    return PRIORITY_BUCKETS[bucketName].size;
  };

  // Sort buckets by priority (order defined in the file)
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
              fontWeight: 500
            }}
            onClick={() => onBucketChange(bucketName)}
          >
            {BUCKET_LABELS[bucketName]} ({getBucketCount(bucketName)})
          </Badge>
        ))}
      </Flex>
    </Flex>
  );
};
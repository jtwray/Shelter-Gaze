import React from 'react';
import { Flex, Badge, Text } from '@radix-ui/themes';
import { getBucketForService } from '../utils/servicebuckets';

export const FilterBadges = ({ services, activeFilters, onFilterChange, activeBuckets = [] }) => {
  const colors = ["blue", "green", "orange", "red", "purple", "mint"];

  // Sort services by count, then alphabetically for equal counts
  const sortedServices = services instanceof Map ? Array.from(services.entries()).sort((a, b) => {
    if (b[1] !== a[1]) {
      return b[1] - a[1]; // Sort by count first
    }
    return a[0].localeCompare(b[0]); // Then alphabetically
  }) : [];

  return (
    <Flex direction="column" gap="2">
      <Text size="2" color="gray" mb="1">Filter by Specific Services:</Text>
      <Flex gap="2" wrap="wrap">
        {sortedServices.map(([service, count], index) => {
          const bucketName = getBucketForService(service);
          // If this service is part of a bucket that's already active, dim it
          const isInActiveBucket = bucketName && activeBuckets.includes(bucketName);
          
          return (
            <Badge
              key={service}
              variant={activeFilters.includes(service) ? "solid" : "soft"}
              color={colors[index % colors.length]}
              style={{
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                transform: activeFilters.includes(service) ? 'scale(1.05)' : 'scale(1)',
                opacity: isInActiveBucket ? 0.5 : 1,
              }}
              onClick={() => onFilterChange(service)}
            >
              {service} ({count})
              {isInActiveBucket && <span style={{ fontSize: '10px' }}>⚬</span>}
            </Badge>
          );
        })}
      </Flex>
    </Flex>
  );
};
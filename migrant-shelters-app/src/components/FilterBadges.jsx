import React from 'react';
import { Flex, Badge, Text } from '@radix-ui/themes';

export const FilterBadges = ({ services, activeFilters, onFilterChange }) => {
  const colors = ["blue", "green", "orange", "red", "purple", "mint"];

  return (
    <Flex direction="column" gap="2">
      <Text size="2" color="gray" mb="1">Filter by Services:</Text>
      <Flex gap="2" wrap="wrap">
        {Array.from(services.entries()).map(([service, count], index) => (
          <Badge
            key={service}
            variant={activeFilters.includes(service) ? "solid" : "soft"}
            color={colors[index % colors.length]}
            style={{ cursor: 'pointer' }}
            onClick={() => onFilterChange(service)}
          >
            {service} ({count})
          </Badge>
        ))}
      </Flex>
    </Flex>
  );
};
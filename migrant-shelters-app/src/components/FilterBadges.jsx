import React from 'react';
import { Flex, Badge, Text } from '@radix-ui/themes';

export const FilterBadges = ({ services, activeFilters, onFilterChange }) => {
  const colors = ["blue", "green", "orange", "red", "purple", "mint"];

  // First scenario, when services is meant to be a Map:
  const sortedServices = services instanceof Map ? Array.from(services.entries()).sort((a, b) => {
    // Sort services by count, then alphabetically for equal counts
    if (b[1] !== a[1]) {
      return b[1] - a[1]; // Sort by count first
    }
    return a[0].localeCompare(b[0]); // Then alphabetically
  }) : []; // Handle the case when services is not initialized.

  // // Second scenario, when services is meant to be a plain object:
  // const sortedServices = Array.from(Object.entries(services??{})).sort((a, b) => {
  //   // Sort services by count, then alphabetically for equal counts
  //   if (b[1] !== a[1]) {
  //     return b[1] - a[1]; // Sort by count first
  //   }
  //   return a[0].localeCompare(b[0]); // Then alphabetically
  // });
  // // Sort services by count, then alphabetically for equal counts
  // const sortedServices = Array.from(services?.entries()??[]).sort((a, b) => {
  //   if (b[1] !== a[1]) {
  //     return b[1] - a[1]; // Sort by count first
  //   }
  //   return a[0].localeCompare(b[0]); // Then alphabetically
  // });

  return (
    <Flex direction="column" gap="2">
      <Text size="2" color="gray" mb="1">Filter by Services:</Text>
      <Flex gap="2" wrap="wrap">
        {sortedServices.map(([service, count], index) => (
          <Badge
            key={service}
            variant={activeFilters.includes(service) ? "solid" : "soft"}
            color={colors[index % colors.length]}
            style={{
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              transform: activeFilters.includes(service) ? 'scale(1.05)' : 'scale(1)'
            }}
            onClick={() => onFilterChange(service)}
          >
            {service} ({count})
          </Badge>
        ))}
      </Flex>
    </Flex>
  );
};
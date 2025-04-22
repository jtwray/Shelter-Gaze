import React from 'react';
import { Flex, Heading, Text, Button, Badge } from '@radix-ui/themes';
import { GlobeIcon, CaretSortIcon } from '@radix-ui/react-icons';
// import { FilterPopover } from './FilterPopover';
// import { ActiveFilters } from './ActiveFilters';
// import './FilterPopover.css';
import { FilterBadges } from './FilterBadges';

export const Header = ({ 
  totalShelters, 
  onToggleMap, 
  isMapVisible = true,
  services,
  activeFilters,
  onFilterChange,
  onClearFilters
}) => {
  const handleRemoveFilter = (filter) => {
    onFilterChange(filter);
  };

  return (
    <Flex 
      direction="column" 
      gap="3" 
      p="4" 
      style={{
        borderBottom: '1px solid var(--gray-5)',
        background: 'var(--gray-1)',
      }}
    >
      <Flex justify="between" align="center">
        <Heading size="4">Available Shelters</Heading>
        <Flex gap="2">
          <FilterBadges services activeFilters onFilterChange />
          {/* <FilterPopover
            services={services}
            activeFilters={activeFilters}
            onFilterChange={onFilterChange}
            onClearFilters={onClearFilters}
          /> */}
          <Button size="2" variant="soft">
            <CaretSortIcon width="16" height="16" />
            Sort
          </Button>
          {onToggleMap && (
            <Button size="2" variant="soft" onClick={onToggleMap}>
              <GlobeIcon width="16" height="16" />
              {isMapVisible ? 'Hide Map' : 'Show Map'}
            </Button>
          )}
        </Flex>
      </Flex>
      <Flex direction="column" gap="2">
        <Flex align="center" gap="2">
          <Text size="2" color="gray">
            {totalShelters} locations found
          </Text>
          <Badge size="1" variant="soft" color="blue">
            New York City
          </Badge>
          {activeFilters?.length > 0 && (
            <Text size="2" color="gray">
              • {activeFilters?.length} filter{activeFilters?.length > 1 ? 's' : ''} active
            </Text>
          )}
        </Flex>
        {/* <ActiveFilters
          activeFilters={activeFilters}
          onRemoveFilter={handleRemoveFilter}
          onClearFilters={onClearFilters}
        /> */}
      </Flex>
    </Flex>
  );
};
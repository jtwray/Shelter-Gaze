import React, { useState } from 'react';
import { Flex, Heading, Text, Button, Badge } from '@radix-ui/themes';
import { GlobeIcon, CaretSortIcon, MixerHorizontalIcon } from '@radix-ui/react-icons';
import { FilterDrawer, ActiveFilterChips } from './FilterDrawer';

export const Header = ({
  totalShelters,
  onToggleMap,
  isMapVisible = true,
  services,
  activeFilters,
  activeBuckets = [],
  onFilterChange,
  onBucketChange,
  onClearFilters
}) => {
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  
  const toggleFilterDrawer = () => {
    setIsFilterDrawerOpen(prev => !prev);
  };

  // Calculate total active filters (service filters + bucket filters)
  const totalActiveFilters = (activeFilters?.length || 0) + (activeBuckets?.length || 0);

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
          <Button 
            size="2" 
            variant={totalActiveFilters > 0 ? "solid" : "soft"}
            color={totalActiveFilters > 0 ? "blue" : "gray"}
            onClick={toggleFilterDrawer}
            style={{ position: 'relative' }}
          >
            <MixerHorizontalIcon width="16" height="16" />
            Filter
            {totalActiveFilters > 0 && (
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                background: 'var(--blue-9)',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                color: 'white',
              }}>
                {totalActiveFilters}
              </span>
            )}
          </Button>
          
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
          {totalActiveFilters > 0 && (
            <Text size="2" color="gray">
              • {totalActiveFilters} filter{totalActiveFilters > 1 ? 's' : ''} active
            </Text>
          )}
        </Flex>
        
        {/* Show active filter chips when drawer is closed */}
        {!isFilterDrawerOpen && (
          <ActiveFilterChips 
            activeFilters={activeFilters}
            activeBuckets={activeBuckets}
            onFilterChange={onFilterChange}
            onBucketChange={onBucketChange}
            onClearFilters={onClearFilters}
          />
        )}
      </Flex>
      
      {/* Overlay to close drawer when clicking outside */}
      <div 
        className={`drawer-overlay ${isFilterDrawerOpen ? 'visible' : ''}`} 
        onClick={toggleFilterDrawer}
      />
      
      {/* Filter drawer */}
      <FilterDrawer 
        isOpen={isFilterDrawerOpen}
        onToggle={toggleFilterDrawer}
        services={services}
        activeFilters={activeFilters}
        activeBuckets={activeBuckets}
        onFilterChange={onFilterChange}
        onBucketChange={onBucketChange}
        onClearFilters={onClearFilters}
      />
    </Flex>
  );
};
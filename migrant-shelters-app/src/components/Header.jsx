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
  onFilterChange,
  onClearFilters
}) => {
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  
  const toggleFilterDrawer = () => {
    setIsFilterDrawerOpen(prev => !prev);
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
          <Button 
            size="2" 
            variant={activeFilters?.length > 0 ? "solid" : "soft"}
            color={activeFilters?.length > 0 ? "blue" : "gray"}
            onClick={toggleFilterDrawer}
            style={{ position: 'relative' }}
          >
            <MixerHorizontalIcon width="16" height="16" />
            Filter
            {activeFilters?.length > 0 && (
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
                {activeFilters.length}
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
          {activeFilters?.length > 0 && (
            <Text size="2" color="gray">
              • {activeFilters?.length} filter{activeFilters?.length > 1 ? 's' : ''} active
            </Text>
          )}
        </Flex>
        
        {/* Show active filter chips when drawer is closed */}
        {!isFilterDrawerOpen && (
          <ActiveFilterChips 
            activeFilters={activeFilters}
            onFilterChange={onFilterChange}
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
        onFilterChange={onFilterChange}
        onClearFilters={onClearFilters}
      />
    </Flex>
  );
};
import React, { useState, useCallback, memo } from 'react';
import { Flex, Heading, Text, Button, Badge } from '@radix-ui/themes';
import { GlobeIcon, CaretSortIcon, MixerHorizontalIcon } from '@radix-ui/react-icons';
import { FilterDrawer, ActiveFilterChips } from './FilterDrawer';

// Memoize the Header component
export const Header = memo(({
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
  
  // Use useCallback for toggleFilterDrawer
  const toggleFilterDrawer = useCallback(() => {
    setIsFilterDrawerOpen(prev => !prev);
  }, []);

  // Handle overlay click with stopping propagation
  const handleOverlayClick = useCallback((e) => {
    e.stopPropagation();
    setIsFilterDrawerOpen(false);
  }, []);

  // Total active filters
  const totalActiveFilters = (activeFilters?.length || 0) + (activeBuckets?.length || 0);

  // Memoize button components to prevent unnecessary re-renders
  const FilterButton = useCallback(({ totalActiveFilters, onClick }) => (
    <Button 
      size="2" 
      variant={totalActiveFilters > 0 ? "solid" : "soft"}
      color={totalActiveFilters > 0 ? "blue" : "gray"}
      onClick={onClick}
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
  ), []);

  // Memoize map toggle button
  const MapToggleButton = useCallback(({ onToggleMap, isMapVisible }) => (
    <Button size="2" variant="soft" onClick={onToggleMap}>
      <GlobeIcon width="16" height="16" />
      {isMapVisible ? 'Hide Map' : 'Show Map'}
    </Button>
  ), []);

  // Memoize the filter button click handler
  const handleFilterButtonClick = useCallback((e) => {
    e.stopPropagation();
    toggleFilterDrawer();
  }, [toggleFilterDrawer]);

  // Memoize the map toggle button click handler
  const handleMapToggleClick = useCallback((e) => {
    e.stopPropagation();
    onToggleMap();
  }, [onToggleMap]);

  return (
    <Flex
      direction="column"
      gap="3"
      p="4"
      style={{
        borderBottom: '1px solid var(--gray-5)',
        background: 'var(--gray-1)',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <Flex justify="between" align="center">
        <Heading size="4">Available Shelters</Heading>
        <Flex gap="2">
          <FilterButton 
            totalActiveFilters={totalActiveFilters} 
            onClick={handleFilterButtonClick} 
          />
          
          <Button size="2" variant="soft">
            <CaretSortIcon width="16" height="16" />
            Sort
          </Button>
          
          {onToggleMap && (
            <MapToggleButton 
              onToggleMap={handleMapToggleClick} 
              isMapVisible={isMapVisible} 
            />
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
        onClick={handleOverlayClick}
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
});
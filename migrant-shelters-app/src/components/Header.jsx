import React, { useState, useCallback, memo } from 'react';
import { Flex, Heading, Text, Button, Badge, Tabs, Card, Tooltip } from '@radix-ui/themes';
import { GlobeIcon, CaretSortIcon, MixerHorizontalIcon, InfoCircledIcon } from '@radix-ui/react-icons';
import { FilterDrawer, ActiveFilterChips } from './FilterDrawer';
import { FilterModeToggle } from './FilterModeToggle';
import { Switcherooni, Switcheroonie, ToggleSwitch, ToggleSwitch3 } from './Switch';

// Memoize the Header component
export const Header = memo(({
  totalShelters,
  onToggleMap,
  isMapVisible = true,
  services,
  activeFilters,
  activeBuckets = [],
  filterMode,
  onFilterChange,
  onBucketChange,
  onClearFilters,
  handleToggleFilterMode
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

  // Memoize filter mode toggle handler
  const handleFilterModeToggle = useCallback((e) => {
    handleToggleFilterMode(e.target.checked ? 'any' : 'all');
  }, [handleToggleFilterMode]);

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
    // <Flex
    //   direction="column"
    //   gap="3"
    //   p="4"
    //   style={{
    //     borderBottom: '1px solid var(--gray-5)',
    //     background: 'var(--gray-1)',
    //     position: 'relative',
    //     zIndex: 10,
    //   }}
    // >
    //   <Flex justify="between" align="center">
    //     <Heading size="4">Available Shelters</Heading>
    //     <Flex gap="2" align="center">
    //       <FilterButton
    //         totalActiveFilters={totalActiveFilters}
    //         onClick={handleFilterButtonClick}
    //       />

    //       <Button size="2" variant="soft">
    //         <CaretSortIcon width="16" height="16" />
    //         Sort
    //       </Button>

    //       <Tooltip content={filterMode === 'any' ? 'Match any filter (OR)' : 'Match all filters (AND)'}>
    //         <Flex align="center" gap="1" style={{ marginLeft: '4px' }}>
    //           <Text size="1" style={{ whiteSpace: 'nowrap', color: 'var(--gray-11)' }}>
    //             {filterMode === 'any' ? 'Any' : 'All'}
    //           </Text>
    //           <ToggleSwitch
    //             handleToggleSwitch={handleFilterModeToggle}
    //             switchId="filterMode"
    //             switchState={filterMode === 'any'}
    //             size="small"
    //           />
    //           <ToggleSwitch3
    //             handleToggleSwitch={handleFilterModeToggle}
    //             switchId="filterMode_ToggleSwitch3"
    //             switchState={filterMode === 'any'}
    //             switchLabel="ToggleSwitch3"
    //           />
    //         </Flex>
    //       </Tooltip>

    //       {onToggleMap && (
    //         <MapToggleButton
    //           onToggleMap={handleMapToggleClick}
    //           isMapVisible={isMapVisible}
    //         />
    //       )}
    //     </Flex>
    //   </Flex>
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
        <Flex gap="2" align="center">
          <FilterButton
            totalActiveFilters={totalActiveFilters}
            onClick={handleFilterButtonClick}
          />

          <Button size="2" variant="soft">
            <CaretSortIcon width="16" height="16" />
            Sort
          </Button>

          <FilterModeToggle
            filterMode={filterMode}
            onChange={handleToggleFilterMode}
          />

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
          > 
          {/* {totalActiveFilters > 0 && (
            <Text size="2" color="gray">
              • {totalActiveFilters} filter{totalActiveFilters > 1 ? 's' : ''} active
            </Text>
          )} */}
          </ActiveFilterChips>
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
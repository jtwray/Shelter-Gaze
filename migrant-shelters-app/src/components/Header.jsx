import React, { useState, useCallback, memo } from 'react';
import { Flex, Heading, Text, Button, Badge, Tooltip } from '@radix-ui/themes';
import { GlobeIcon, CaretSortIcon, MixerHorizontalIcon } from '@radix-ui/react-icons';
import { FilterDrawer, ActiveFilterChips } from './FilterDrawer';
import { FilterModeToggle } from './FilterModeToggle';
import { useViewport } from '../hooks/useViewport';

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
  const { size } = useViewport();
  const isMobile = size === 'xs' || size === 'xs-' || size === 'sm';
  
  const toggleFilterDrawer = useCallback(() => {
    setIsFilterDrawerOpen(prev => !prev);
  }, []);

  const handleOverlayClick = useCallback((e) => {
    e.stopPropagation();
    setIsFilterDrawerOpen(false);
  }, []);

  const totalActiveFilters = (activeFilters?.length || 0) + (activeBuckets?.length || 0);

  const FilterButton = useCallback(({ totalActiveFilters, onClick }) => (
    <Button
      size={isMobile ? "1" : "2"}
      variant={totalActiveFilters > 0 ? "solid" : "soft"}
      color={totalActiveFilters > 0 ? "blue" : "gray"}
      onClick={onClick}
      style={{ position: 'relative' }}
    >
      <MixerHorizontalIcon width={isMobile ? "14" : "16"} height={isMobile ? "14" : "16"} />
      {!isMobile && "Filter"}
      {totalActiveFilters > 0 && (
        <span style={{
          position: 'absolute',
          top: '-6px',
          right: '-6px',
          background: 'var(--blue-9)',
          borderRadius: '50%',
          width:(isMobile ? '16px' : '18px'),
          height:(isMobile ? '16px' : '18px'),
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
  ), [isMobile]);

  const MapToggleButton = useCallback(({ onToggleMap, isMapVisible }) => (
    <Button size={isMobile ? "1" : "2"} variant="soft" onClick={onToggleMap}>
      <GlobeIcon width={isMobile ? "14" : "16"} height={isMobile ? "14" : "16"} />
      {!isMobile && (isMapVisible ? 'Hide Map' : 'Show Map')}
    </Button>
  ), [isMobile]);

  const handleFilterButtonClick = useCallback((e) => {
    e.stopPropagation();
    toggleFilterDrawer();
  }, [toggleFilterDrawer]);

  const handleMapToggleClick = useCallback((e) => {
    e.stopPropagation();
    onToggleMap();
  }, [onToggleMap]);

  return (
    <Flex
      direction="column"
      gap="3"
      p={isMobile ? "2" : "4"}
      style={{
        borderBottom: '1px solid var(--gray-5)',
        background: 'var(--gray-1)',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <Flex justify="between" align="center" wrap={isMobile ? "wrap" : "nowrap"} gap={isMobile ? "1" : "0"}>
        <Heading 
        size={isMobile ? "3" : "4"}
         style={{ 
          marginBottom:(isMobile ? "4px" : "0"),
          ...(isMobile && { width: '100%' })
        }
        }>
          Available Shelters
        </Heading>
        <Flex gap={isMobile ? "1" : "2"} align="center" wrap="wrap">
          <FilterButton
            totalActiveFilters={totalActiveFilters}
            onClick={handleFilterButtonClick}
          />

          {/* Only show Sort button on non-mobile */}
          {!isMobile && (
            <Button size="2" variant="soft">
              <CaretSortIcon width="16" height="16" />
              Sort
            </Button>
          )}

          <FilterModeToggle
            filterMode={filterMode}
            onChange={handleToggleFilterMode}
            compact={isMobile}
          />

          {/* Only show Map Toggle on non-mobile */}
          {onToggleMap && !isMobile && (
            <MapToggleButton
              onToggleMap={handleMapToggleClick}
              isMapVisible={isMapVisible}
            />
          )}
        </Flex>
      </Flex>
      
      <Flex direction="column" gap="2">
        <Flex align="center" gap="2" wrap="wrap">
          <Text size={isMobile ? "1" : "2"} color="gray">
            {totalShelters} locations found
          </Text>
          <Badge size="1" variant="soft" color="blue">
            New York City
          </Badge>
          {totalActiveFilters > 0 && (
            <Text size={isMobile ? "1" : "2"} color="gray">
              • {totalActiveFilters} filter{totalActiveFilters > 1 ? 's' : ''} active
            </Text>
          )}
        </Flex>

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

      <div
        className={`drawer-overlay ${isFilterDrawerOpen ? 'visible' : ''}`}
        onClick={handleOverlayClick}
      />

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
import React from 'react';
import { Flex, Button, Badge, Text, Separator } from '@radix-ui/themes';
import { MixerHorizontalIcon, Cross2Icon } from '@radix-ui/react-icons';
import { FilterBadges } from './FilterBadges';
import { BucketFilters } from './BucketFilters';
import { BUCKET_LABELS, getBucketForService } from '../utils/servicebuckets';
import './filterdrawer.css';

export const FilterDrawer = ({ 
  isOpen, 
  onToggle, 
  services,
  activeFilters,
  activeBuckets = [], 
  onFilterChange,
  onBucketChange,
  onClearFilters 
}) => {
  return (
    <div className={`filter-drawer ${isOpen ? 'open' : ''}`}>
      <div className="filter-drawer-content">
        <Flex justify="between" align="center" mb="3">
          <Flex align="center" gap="2">
            <MixerHorizontalIcon width="16" height="16" />
            <Text weight="bold">Filter Shelters</Text>
          </Flex>
          <Button 
            variant="ghost" 
            onClick={onToggle}
            size="1"
          >
            <Cross2Icon />
          </Button>
        </Flex>

        {/* Show bucket filters first */}
        <BucketFilters
          activeBuckets={activeBuckets}
          onBucketChange={onBucketChange}
        />
        
        <Separator my="3" size="4" />
        
        {/* Then show individual service filters */}
        <FilterBadges 
          services={services} 
          activeFilters={activeFilters} 
          onFilterChange={onFilterChange}
          activeBuckets={activeBuckets}
        />

        {(activeFilters?.length > 0 || activeBuckets?.length > 0) && (
          <Flex justify="end" mt="3">
            <Button 
              size="1" 
              variant="soft" 
              color="gray" 
              onClick={onClearFilters}
            >
              Clear all filters
            </Button>
          </Flex>
        )}
      </div>
    </div>
  );
};

// Active filters chips to show when drawer is closed
export const ActiveFilterChips = ({ 
  activeFilters, 
  activeBuckets = [],
  onFilterChange, 
  onBucketChange,
  onClearFilters 
}) => {
  if (!activeFilters?.length && !activeBuckets?.length) return null;
  
  // Bucket colors for consistency
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

  return (
    <Flex gap="2" wrap="wrap" align="center" style={{ marginTop: '8px' }}>
      {/* Show bucket filters first with consistent colors */}
      {activeBuckets.map((bucketName) => (
        <Badge
          key={`bucket-${bucketName}`}
          variant="solid"
          color={bucketColors[bucketName] || "blue"}
          radius="full"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            paddingRight: '8px',
            transition: 'all 0.2s ease',
          }}
        >
          {BUCKET_LABELS[bucketName]}
          <Cross2Icon
            style={{
              width: '14px',
              height: '14px',
              opacity: 0.7,
              cursor: 'pointer'
            }}
            onClick={() => onBucketChange(bucketName)}
          />
        </Badge>
      ))}
      
      {/* Then show individual service filters */}
      {activeFilters.map((filter) => {
        // Don't show services that are already covered by an active bucket
        const bucketName = getBucketForService(filter);
        if (bucketName && activeBuckets.includes(bucketName)) return null;
        
        return (
          <Badge
            key={filter}
            variant="soft"
            color="blue"
            radius="full"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              paddingRight: '8px',
              transition: 'all 0.2s ease',
            }}
          >
            {filter}
            <Cross2Icon
              style={{
                width: '14px',
                height: '14px',
                opacity: 0.7,
                cursor: 'pointer'
              }}
              onClick={() => onFilterChange(filter)}
            />
          </Badge>
        );
      })}
      
      {(activeFilters.length > 1 || activeBuckets.length > 0) && (
        <Button
          variant="ghost"
          color="gray"
          size="1"
          onClick={onClearFilters}
          style={{ padding: '0 8px' }}
        >
          Clear all
        </Button>
      )}
    </Flex>
  );
};
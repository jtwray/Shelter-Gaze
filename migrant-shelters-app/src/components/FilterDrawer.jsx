import React from 'react';
import { Flex, Button, Badge, Text } from '@radix-ui/themes';
import { MixerHorizontalIcon, Cross2Icon } from '@radix-ui/react-icons';
import { FilterBadges } from './FilterBadges';
import './filterdrawer.css';
// import './filterdrawer.module.css';

export const FilterDrawer = ({ 
  isOpen, 
  onToggle, 
  services, 
  activeFilters, 
  onFilterChange,
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

        <FilterBadges 
          services={services} 
          activeFilters={activeFilters} 
          onFilterChange={onFilterChange} 
        />

        {activeFilters?.length > 0 && (
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
export const ActiveFilterChips = ({ activeFilters, onFilterChange, onClearFilters }) => {
  if (!activeFilters?.length) return null;
  
  return (
    <Flex gap="2" wrap="wrap" align="center" style={{ marginTop: '8px' }}>
      {activeFilters.map((filter) => (
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
      ))}
      
      {activeFilters.length > 1 && (
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
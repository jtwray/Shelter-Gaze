
import React, { useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const FilterDropdown = ({ onChange }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    onChange(filter);
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="IconButton" aria-label="Filter options">
          Filter
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
          <DropdownMenu.Item
            className="DropdownMenuItem"
            onSelect={() => handleFilterChange('all')}
          >
            All Shelters
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="DropdownMenuItem"
            onSelect={() => handleFilterChange('requirement1')}
          >
            Requirement 1
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="DropdownMenuItem"
            onSelect={() => handleFilterChange('requirement2')}
          >
            Requirement 2
          </DropdownMenu.Item>
          {/* Add more filter options as needed */}

          <DropdownMenu.Arrow className="DropdownMenuArrow" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default FilterDropdown;
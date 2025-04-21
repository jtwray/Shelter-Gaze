import React from 'react';
import { Flex, Heading, Text, Button, Badge } from '@radix-ui/themes';
import { GlobeIcon, MixerHorizontalIcon , CaretSortIcon } from '@radix-ui/react-icons';

export const Header = ({ totalShelters, onToggleMap, isMapVisible = true }) => {
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
          <Button size="2" variant="soft">
            <MixerHorizontalIcon  width="16" height="16" />
            Filter
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
      <Flex align="center" gap="2">
        <Text size="2" color="gray">
          {totalShelters} locations found
        </Text>
        <Badge size="1" variant="soft" color="blue">
          New York City
        </Badge>
      </Flex>
    </Flex>
  );
};
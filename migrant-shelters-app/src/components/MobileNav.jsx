import React from 'react';
import { Button, Flex } from '@radix-ui/themes';
import { GlobeIcon, ListBulletIcon } from '@radix-ui/react-icons';

export const MobileNav = ({ activeView, onViewChange }) => {
  return (
    <Flex 
      className="mobile-nav" 
      style={{
        position: 'fixed',
        bottom: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'var(--gray-1)',
        padding: '8px',
        borderRadius: '999px',
        boxShadow: 'var(--shadow-elevation)',
        zIndex: 1000,
        display: 'none', // Hidden by default, shown in mobile via CSS
      }}
      gap="2"
    >
      <Button 
        variant={activeView === 'map' ? 'solid' : 'soft'}
        onClick={() => onViewChange('map')}
      >
        <GlobeIcon width="16" height="16" />
        Map
      </Button>
      <Button 
        variant={activeView === 'list' ? 'solid' : 'soft'}
        onClick={() => onViewChange('list')}
      >
        <ListBulletIcon width="16" height="16" />
        List
      </Button>
    </Flex>
  );
};
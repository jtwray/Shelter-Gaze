import React from 'react';
import { Button, Flex } from '@radix-ui/themes';
import { GlobeIcon, ListBulletIcon } from '@radix-ui/react-icons';
import { useWindowSize } from '../hooks/useWindowSize';

export const MobileNav = ({ activeView, onViewChange }) => {
  const [windowWidth] = useWindowSize();
  // Only show on screens smaller than 1024px (typical tablet/mobile breakpoint)
  const isMobileView = windowWidth < 1024;
  
  if (!isMobileView) {
    return null; // Don't render on desktop
  }
  
  return (
    <Flex 
      className="mobile-nav" 
      style={{
        position: 'fixed',
        bottom: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'var(--gray-1)',
        padding: '8px',
        borderRadius: '999px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
        opacity: 0.95,
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

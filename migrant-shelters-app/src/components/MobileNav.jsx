import React from 'react';
import { Button, Flex } from '@radix-ui/themes';
import { GlobeIcon, ListBulletIcon } from '@radix-ui/react-icons';
import { useViewport } from '../hooks/useViewport';

export const MobileNav = ({ activeView, onViewChange }) => {
  const { size } = useViewport();
  const isTinyScreen = size === 'xs-';
  
  // Add check for desktop view
  const isDesktop = window.innerWidth >= 1024;
  
  // Don't render on desktop
  if (isDesktop) {
    return null;
  }

  return (
    <Flex 
      className="mobile-nav" 
      style={{
        position: 'fixed',
        bottom: isTinyScreen ? 8 : 16,
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'var(--gray-1)',
        padding: isTinyScreen ? '4px' : '8px',
        borderRadius: '999px',
        boxShadow: 'var(--shadow-elevation)',
        zIndex: 1000,
        opacity: 0.95,
      }}
      gap="2"
    >
      <Button 
        variant={activeView === 'map' ? 'solid' : 'soft'}
        onClick={() => onViewChange('map')}
        size={isTinyScreen ? '1' : '2'}
      >
        <GlobeIcon width={isTinyScreen ? '14' : '16'} height={isTinyScreen ? '14' : '16'} />
        Map
      </Button>
      <Button 
        variant={activeView === 'list' ? 'solid' : 'soft'}
        onClick={() => onViewChange('list')}
        size={isTinyScreen ? '1' : '2'}
      >
        <ListBulletIcon width={isTinyScreen ? '14' : '16'} height={isTinyScreen ? '14' : '16'} />
        List
      </Button>
    </Flex>
  );
};

import React, { useEffect } from 'react';
import { Button } from '@radix-ui/themes';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

export const ThemeToggle = ({ theme, setTheme }) => {
  // Check for system preference on mount
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
    
    // Listen for changes in system preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      setTheme(e.matches ? 'dark' : 'light');
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [setTheme]);
  
  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  return (
    <Button
      variant="soft"
      onClick={toggleTheme}
      style={{
        position: 'absolute',
        right: '10px',
        bottom: '10px',
        zIndex: 100,
        borderRadius: '999px',
        width: '36px',
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(4px)',
      }}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? <SunIcon width="16" height="16" /> : <MoonIcon width="16" height="16" />}
    </Button>
  );
};
import { useState, useEffect, useMemo } from "react";

// Cache for map images
const mapCache = new Map();

export function useStaticMapBox(latitude, longitude, zoom, width, height) {
  const [mapUrl, setMapUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Create a cache key based on the parameters
  const cacheKey = useMemo(() => 
    `${latitude},${longitude},${zoom},${width},${height}`,
    [latitude, longitude, zoom, width, height]
  );

  useEffect(() => {
    const fetchMap = async () => {
      setIsLoading(true);
      setError(null);

      // Check cache first
      if (mapCache.has(cacheKey)) {
        setMapUrl(mapCache.get(cacheKey));
        setIsLoading(false);
        return;
      }

      try {
        // Calculate optimal dimensions and pixel ratio
        const aspectRatio = 613 / 150;
        const devicePixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
        const isRetina = devicePixelRatio > 1;
        
        // Calculate dimensions based on screen size and pixel ratio
        const calculatedWidth = Math.min(width, window.innerWidth - 40);
        const calculatedHeight = Math.round(calculatedWidth / aspectRatio);
        
        // Use dark theme for dark mode
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const mapStyle = prefersDark ? 'dark-v11' : 'streets-v11';
        
        // Build URL with optimized parameters
        const url = `https://api.mapbox.com/styles/v1/mapbox/${mapStyle}/static/` +
          `${longitude},${latitude},${zoom}/` +
          `${calculatedWidth}x${calculatedHeight}` +
          `${isRetina ? '@2x' : ''}` +
          `?access_token=${import.meta.env.VITE_SHELTERHUB_API_KEY_PUB}`;

        // Implement progressive loading
        const lowResUrl = `https://api.mapbox.com/styles/v1/mapbox/${mapStyle}/static/` +
          `${longitude},${latitude},${zoom}/` +
          `${Math.round(calculatedWidth / 2)}x${Math.round(calculatedHeight / 2)}` +
          `?access_token=${import.meta.env.VITE_SHELTERHUB_API_KEY_PUB}`;

        // Load low-res version first
        setMapUrl(lowResUrl);
        
        // Then load high-res version
        const img = new Image();
        img.onload = () => {
          setMapUrl(url);
          mapCache.set(cacheKey, url);
        };
        img.src = url;

      } catch (err) {
        setError(err);
        console.error('Error fetching map:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMap();
  }, [cacheKey]);

  return [mapUrl, isLoading, error];
}
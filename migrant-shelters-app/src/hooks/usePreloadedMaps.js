// hooks/usePreloadedMaps.js
import { useEffect, useState } from 'react';

// Utility function to get device characteristics for optimized caching
const getDeviceSignature = () => ({
  pixelRatio: window.devicePixelRatio || 1,
  orientation: window.screen.orientation?.type || 'landscape-primary',
  width: window.innerWidth,
  height: window.innerHeight
});

// Generate a MapBox static image URL based on coordinates
const generateMapUrl = (latitude, longitude, zoom = 15, width = 600, height = 200) => {
  // Use dark theme for dark mode
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const mapStyle = prefersDark ? 'dark-v11' : 'streets-v11';
  const isRetina = window.devicePixelRatio > 1;
  
  return `https://api.mapbox.com/styles/v1/mapbox/${mapStyle}/static/` +
    `${longitude},${latitude},${zoom}/` +
    `${width}x${height}` +
    `${isRetina ? '@2x' : ''}` +
    `?access_token=${import.meta.env.VITE_SHELTERHUB_API_KEY_PUB}`;
};

// Generate a cache key from a URL
const getCacheKey = (url) => {
  // Simple hash function for strings
  let hash = 0;
  for (let i = 0; i < url.length; i++) {
    const char = url.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return `map-${hash}`;
};

// Check if a cache entry is valid
const isCacheValid = (entry, deviceSig) => {
  if (!entry || !entry.blob) return false;
  
  const ONE_WEEK = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
  const now = Date.now();
  
  return (
    // Check if cache entry exists and has required fields
    entry && 
    entry.blob &&
    entry.timestamp &&
    // Check if cache is still fresh
    now - entry.timestamp < ONE_WEEK &&
    // Check if device characteristics match (for proper sizing)
    entry.device &&
    entry.device.pixelRatio === deviceSig.pixelRatio
  );
};

// Fetch an image and convert to base64
const fetchAndEncodeImage = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    throw error;
  }
};

export function usePreloadedMaps(shelters) {
    const [mapData, setMapData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Only run this once for the entire list
        const preloadAllMaps = async () => {
            setIsLoading(true);
            const cache = JSON.parse(localStorage.getItem('shelter-maps') || '{}');
            const deviceSig = getDeviceSignature();
            const results = {};

            // Process all shelters at once - with concurrency limits
            const batchSize = 5; // Process 5 images at a time to avoid overloading
            const shelterBatches = [];
            
            // Group shelters into batches
            for (let i = 0; i < shelters.length; i += batchSize) {
                shelterBatches.push(shelters.slice(i, i + batchSize));
            }
            
            // Process each batch sequentially
            for (const batch of shelterBatches) {
                // Process images in this batch concurrently
                const batchPromises = batch.map(async (shelter) => {
                    const { coordinates, id, name } = shelter;
                    if (!coordinates?.latitude || !coordinates?.longitude) return null;

                    const mapUrl = generateMapUrl(
                        coordinates.latitude, 
                        coordinates.longitude
                    );
                    const cacheKey = getCacheKey(mapUrl);

                    if (isCacheValid(cache[cacheKey], deviceSig)) {
                        // Use cached version
                        results[id || name] = cache[cacheKey].blob;
                        return;
                    }

                    // Fetch new image if not in cache
                    try {
                        const imageData = await fetchAndEncodeImage(mapUrl);
                        // Update cache
                        cache[cacheKey] = {
                            url: mapUrl,
                            blob: imageData,
                            device: deviceSig,
                            timestamp: Date.now(),
                            version: '1.0'
                        };
                        results[id || name] = imageData;
                    } catch (err) {
                        console.error(`Failed to load map for ${name}:`, err);
                        results[id || name] = null;
                    }
                });

                // Wait for current batch to complete before moving to next
                await Promise.all(batchPromises);
            }

            // Save updated cache to localStorage
            try {
                localStorage.setItem('shelter-maps', JSON.stringify(cache));
            } catch (e) {
                // Handle localStorage quota exceeded
                console.warn('Cache storage failed, clearing older entries');
                const entries = Object.entries(cache);
                // Remove oldest 50% of entries if storage fails
                entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
                const newCache = Object.fromEntries(entries.slice(entries.length / 2));
                localStorage.setItem('shelter-maps', JSON.stringify(newCache));
            }
            
            setMapData(results);
            setIsLoading(false);
        };

        preloadAllMaps();
    }, [shelters]); // Only re-run if entire shelter list changes

    return [mapData, isLoading];
}
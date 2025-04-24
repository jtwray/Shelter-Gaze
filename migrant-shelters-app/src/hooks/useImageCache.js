import { useState, useEffect } from 'react';


export function useImageCache(url, options = {}) {
  const {
    namespace = 'shelter-maps',
    version = '1.0',
    expireAfter = 7 * 24 * 60 * 60 * 1000, // 1 week
    maxEntries = 50
  } = options;

  const [cachedImage, setCachedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getDeviceSignature = () => ({
    pixelRatio: window.devicePixelRatio || 1,
    orientation: window.screen.orientation.type,
    width: window.screen.width,
    height: window.screen.height
  });


  const getCacheKey = (url) => `${namespace}-${url}`;

  const clearOldEntries = (cache) => {
    const entries = Object.entries(cache);
    const now = Date.now();

    // Remove expired entries and check version
    const validEntries = entries.filter(([_, entry]) =>
      now - entry.timestamp < expireAfter &&
      entry.version === version
    );

    // Enforce maxEntries limit
    if (maxEntries && validEntries.length > maxEntries) {
      validEntries.sort((a, b) => b[1].timestamp - a[1].timestamp);
      validEntries.splice(maxEntries);
    }

    return Object.fromEntries(validEntries);
  };

  useEffect(() => {
    if (!url) {
      setIsLoading(false);
      return;
    }

    const fetchAndCacheImage = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const cacheKey = getCacheKey(url);
        const cache = JSON.parse(localStorage.getItem(namespace) || '{}');
        const deviceSig = getDeviceSignature();
        const entry = cache[cacheKey];

        // Check if we have a valid cached entry
        if (entry?.blob &&
          entry.version === version &&
          Date.now() - entry.timestamp < expireAfter &&
          entry.device.pixelRatio === deviceSig.pixelRatio &&
          entry.device.orientation === deviceSig.orientation) {
          setCachedImage(entry.blob);
          setIsLoading(false);
          return;
        }

        // Fetch new image
        const response = await fetch(url);
        const blob = await response.blob();
        const base64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });

        // Update cache
        const newCache = clearOldEntries({
          ...cache,
          [cacheKey]: {
            url,
            blob: base64,
            device: deviceSig,
            timestamp: Date.now(),
            version: version
          }
        });

        localStorage.setItem(namespace, JSON.stringify(newCache));
        setCachedImage(base64);

      } catch (err) {
        setError(err);
        console.error('Error caching image:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndCacheImage();
  }, [url, version, namespace, expireAfter, maxEntries]);

  return { cachedImage, isLoading, error };
}
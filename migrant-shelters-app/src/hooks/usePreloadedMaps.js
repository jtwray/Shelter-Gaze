// hooks/usePreloadedMaps.js
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
        
        // Process all shelters at once
        const promises = shelters.map(async (shelter) => {
          const { coordinates } = shelter;
          if (!coordinates) return null;
          
          const mapUrl = generateMapUrl(coordinates.latitude, coordinates.longitude);
          const cacheKey = getCacheKey(mapUrl);
          
          if (isCacheValid(cache[cacheKey], deviceSig)) {
            // Use cached version
            results[shelter.id] = cache[cacheKey].blob;
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
            results[shelter.id] = imageData;
          } catch (err) {
            console.error(`Failed to load map for ${shelter.name}:`, err);
            results[shelter.id] = null;
          }
        });
        
        // Wait for all images to load
        await Promise.all(promises);
        localStorage.setItem('shelter-maps', JSON.stringify(cache));
        setMapData(results);
        setIsLoading(false);
      };
      
      preloadAllMaps();
    }, [shelters]); // Only re-run if entire shelter list changes
    
    return [mapData, isLoading];
  }
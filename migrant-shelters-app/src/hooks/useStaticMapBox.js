import { useState, useEffect } from "react";

export function useStaticMapBox(latitude, longitude, zoom, width, height) {
  const [mapUrl, setMapUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMap = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Calculate appropriate dimensions based on screen size
        const aspectRatio = 613 / 150; // Original aspect ratio
        const calculatedWidth = Math.min(width, window.innerWidth - 40); // 40px padding
        const calculatedHeight = Math.round(calculatedWidth / aspectRatio);

        const url = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${longitude},${latitude},${zoom}/${calculatedWidth}x${calculatedHeight}@2x?access_token=${import.meta.env.VITE_SHELTERHUB_API_KEY_PUB}`;
        setMapUrl(url);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMap();
  }, [latitude, longitude, zoom, width, height]);

  return [mapUrl, isLoading, error];
}
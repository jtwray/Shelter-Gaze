
import { useState, useEffect } from "react";
import { useWindowSize } from "./useWindowSize";
const TOKEN = import.meta.env.VITE_SHELTERHUB_API_KEY;

export function useStaticMapBox(lat, lon, zoom=15, setWidth = null, setHeight = null) {
  const [w, h] = useWindowSize();
  const [map, setMap] = useState();

  useEffect(() => {
    setMap(
      `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-l-doctor+545454(${lon
      },${lat})/${lon},${lat},${zoom}/${setWidth ?? (w * 0.9).toFixed(0)
      }x${setHeight ?? (h * 0.5).toFixed(0)}?access_token=${TOKEN}`
    );
  }, [lat, lon, h, w]);

  return [map];
}
{/* <div style={{ width: '600px', height: '100px' }}>
  <AspectRatio ratio={16 / 9}>
    <img
      src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/40.7580,-73.9855,15/600x100?access_token=YOUR_MAPBOX_ACCESS_TOKEN"
      alt="Map of Times Square"
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
  </AspectRatio>
</div> */}
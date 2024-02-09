import mapboxgl from "mapbox-gl";
import { useRef, useEffect } from "react";

export function Marker({ map, shelter }) {
  console.info({
    map,
    x: shelter.coordinates.latitude,
    y: shelter.coordinates.longitude,
  });

  const markerRef = useRef();
  useEffect(() => {
    if (markerRef.current) return;
    markerRef.current = new mapboxgl.Marker({
      color: "#FFFFFF",
      draggable: true,width:34,height:35,background:'indigo',border:'solid pink 3px'
    })
      .setLngLat(shelter.coordinates)
      .addTo(map);
  });

  return <span ref={markerRef} className="marker"></span>;
}

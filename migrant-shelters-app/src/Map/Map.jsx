import React, { useRef, useState, useEffect } from "react";
// import Marker from "mapbox-gl/src/ui/marker";
import { Marker } from "./Marker";
import "./map.css";
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = import.meta.env.VITE_SHELTERHUB_API_KEY;

export function Map({ children, shelters, lat, setLat, lng, setLng }) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  // const [lng, setLng] = useState(-70.9);
  // const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  const [mapStyle, setMapStyle] = useState(() => "streets-v12");

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: `mapbox://styles/mapbox/${mapStyle}`,
      center: [lng, lat],
      zoom: zoom,
    });
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      })
    );
  });

  return (
    <div ref={mapContainer} id="map-container">
      {children}
      {map.current &&
        shelters.map((eachShelter, idx) => (
          <Marker
            key={`${eachShelter.location ?? "_"}-${idx ?? "_"}-${
              eachShelter.name ?? "_"
            }`}
            shelter={eachShelter}
            map={map}
          />
        ))}
    </div>
  );
}

// create a component ata time and rework the architecture only as needed.

/**
 *
 * try to maintain decoupled features and compose them together.
 *
 *
 * create map first
 *
 * in a map component
 *
 * add it to App
 *
 *
 * set styhles to 100% of Map Component CONtainer
 *
 *
 * II
 * create a ListItem Card COmponent
 *
 * add it directly to the App component under the Map component
 *  \
 * III
 *  add a SheltersList COmponent
 *
 * use it to loop through sheltersList and create a SHelterCard for each of them
 *
 * remove the shelterCard from App
 *
 * add the SHeltersList component in its place
 *
 *
 *
 *
 *
 */

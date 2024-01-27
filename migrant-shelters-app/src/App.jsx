// eslint-disable-next-line no-unused-vars
import React, { useRef, useEffect, useState } from "react";
import ShelterList from "./ShelterList";
import FilterDropdown from "./FilterDropdown";
import Map from "./Map";
import { Avatar, Badge, Box, Flex, IconButton } from "@radix-ui/themes";
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = import.meta.env.VITE_SHELTERHUB_API_KEY;
const api__key = import.meta.env.VITE_SOME_KEY;
const viteenvvars = import.meta;
console.log(import.meta.env.VITE_SOME_KEY, { api__key, viteenvvars });
import satelliteIcon from "./assets/satellite.svg";
import outdoorsIcon from "./assets/outdoors.svg";
import sunIcon from "./assets/sun.svg";
import darkIcon from "./assets/dark.svg";

const App = () => {
  console.log({ apikey: mapboxgl.accessToken });


  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  const [selectedShelter, setSelectedShelter] = useState(null);
  const [mapStyle, setMapStyle] = useState(() => "streets-v12");
  const handleMarkerClick = (index) => {
    setSelectedShelter(index);
  };
  const handleSelectMapStyle = (selectedStyle) => {
    setMapStyle(() => selectedStyle);
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: `mapbox://styles/mapbox/${mapStyle}`,
      center: [lng, lat],
      zoom: zoom,
    });
  };
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
  });
  const layerIcons = {
    "satellite-streets-v12": satelliteIcon,
    "light-v11": sunIcon,
    "dark-v11": darkIcon,
    "outdoors-v12": outdoorsIcon,
  };
  return (
    <div style={{ height: "100vmin", width: "100vmin" }}>
      <div style={{ height: "49vmin", width: "49vmin" }}>
        <div className="sidebar">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}| map style:{" "}
          <LayerControls
            mapStyle={mapStyle}
            layers={layers}
            handleSelectMapStyle={handleSelectMapStyle}
            layerIcons={layerIcons}
          />
        </div>
        <div
          ref={mapContainer}
          className="map-container"
          style={{ width: "49vmin !important", height: "49vmin !important" }}
        />{" "}
        <FilterDropdown
          onChange={(filter) => console.log(`Filter: ${filter}`)}
        />
        <ShelterList />
      </div>
    </div>
  );
};

export default App;
const layers = [
  "satellite-streets-v12",
  "light-v11",
  "dark-v11",
  "outdoors-v12",
];

const LayerControls = ({
  layers,
  handleSelectMapStyle,
  mapStyle,
  layerIcons,
}) => (
  <div style={{ display: "flex", gap: 5 }}>
    {layers.map((layer) => (
      <IconButton
        key={layer}
        size="1"
        variant={mapStyle === layer ? "solid" : "soft"}
        color={mapStyle === layer ? "crimson" : "white"}
        onClick={() => handleSelectMapStyle(layer)}
      >
        <img
          src={layerIcons[layer]}
          width="50"
          height="50"
          style={{ color: mapStyle === layer ? "crimson" : "white" }}
        />
      </IconButton>
    ))}
  </div>
);

/*
map

markers

browser gps



 */

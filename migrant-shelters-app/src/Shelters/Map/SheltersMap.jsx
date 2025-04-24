import React, { useRef, useEffect, useMemo, Suspense,useCallback, lazy } from "react";

import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
  Source,
  Layer,
} from "react-map-gl";
import Pin from "./Pin";
import SHELTERS from "../../assets/shelters.json";
import './map.css';

// Lazy load non-essential components
const PopupContent = lazy(() => import("./PopupContent").then(module => ({ 
  default: module.PopupContent 
})));



function Pins({ selectedShelterCardName, setPopupInfo, shelters = SHELTERS }) {
  if (!shelters?.length) return null;

  return (
    <>
      {shelters.map((shelter, index) => {
        if (!shelter?.coordinates?.latitude || !shelter?.coordinates?.longitude) return null;
        
        return (
          <Marker
            key={`marker-${index}`}
            longitude={shelter.coordinates.longitude}
            latitude={shelter.coordinates.latitude}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setPopupInfo(shelter);
            }}
          >
            <Pin 
              size={24} 
              isSelected={selectedShelterCardName === shelter.name}
            />
          </Marker>
        );
      })}
    </>
  );
}

export const SheltersMap = ({
  viewState = {
    latitude: 40.7128,
    longitude: -74.006,
    zoom: 9,
    bearing: 0,
    pitch: 60,
  },
  setViewState,
  selectedShelterCardName,
  setPopupInfo,
  popupInfo,
  shelters = SHELTERS,
  windowWidth,
  windowHeight
}) => {
  const mapRef = useRef(null);

  const calculatePopupWidth = useMemo(() => {
    return windowWidth < 768 ? "300px" : "400px";
  }, [windowWidth]);

  const onMove = useCallback(({ viewState }) => {
    setViewState?.(viewState);
  }, [setViewState]);
// Dynamically load CSS
useEffect(() => {
  // Load the CSS only when the map component mounts
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css';
  document.head.appendChild(link);
  
  return () => {
    // Clean up on unmount
    document.head.removeChild(link);
  };
}, []);
  return (
    <Map
      id="mapA"
      onMove={onMove}
      {...viewState}
      initialViewState={viewState}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/navigation-night-v1"
      mapboxAccessToken={import.meta.env.VITE_SHELTERHUB_API_KEY_PUB}
      attributionControl={false}
      ref={mapRef}
      transitionDuration={1000}
      transitionInterpolator={{ type: 'fly' }}
    >
      <GeolocateControl 
        position="top-left"
        showUserLocation
        trackUserLocation
        style={{ marginTop: '10px' }}
      />
      <FullscreenControl position="top-left" />
      <NavigationControl
        position="top-right"
        showCompass
        showZoom
        visualizePitch
      />
      <ScaleControl position="bottom-right" />

      <Pins
        selectedShelterCardName={selectedShelterCardName}
        setPopupInfo={setPopupInfo}
        shelters={shelters}
      />

      {/* Wrap popup in Suspense */}
      {popupInfo && (
        <Popup
          anchor="bottom"
          longitude={Number(popupInfo.coordinates?.longitude) || 0}
          latitude={Number(popupInfo.coordinates?.latitude) || 0}
          onClose={() => setPopupInfo(null)}
          closeButton={true}
          closeOnClick={false}
          className="shelter-popup"
          tipSize={8}
          offsetTop={12}
        >
          <Suspense fallback={<div>Loading...</div>}>
            <div className="popup-content">
              <h3>{popupInfo.name}</h3>
              <p><strong>{popupInfo.type}</strong></p>
              <p>{popupInfo.location}</p>
              <div className="popup-services">
                {popupInfo.services?.slice(0, 3).map((service, i) => (
                  <span key={i} className="popup-service">{service}</span>
                ))}
                {(popupInfo.services?.length || 0) > 3 && (
                  <span className="popup-service-more">
                    +{popupInfo.services.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </Suspense>
        </Popup>
      )}
    </Map>
  );
};

export default SheltersMap;

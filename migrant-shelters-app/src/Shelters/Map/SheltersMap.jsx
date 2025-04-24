import React, { useCallback, useRef, useEffect, useState } from "react";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";
import Pin from "./Pin";
import SHELTERS from "../../assets/shelters.json";
import './map.css';

// Map style constants
const MAP_STYLES = {
  light: "mapbox://styles/mapbox/light-v11", // Light theme
  dark: "mapbox://styles/mapbox/navigation-night-v1", // Dark theme
};

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

export function SheltersMap({
  viewState,
  setViewState,
  selectedShelterCardName,
  setPopupInfo,
  popupInfo,
  shelters = SHELTERS,
  windowWidth,
  windowHeight,
  theme = 'dark' // Default to dark theme
}) {
  const mapRef = useRef();
  const [mapLoaded, setMapLoaded] = useState(false);
  
  // Use the appropriate map style based on theme
  const mapStyle = MAP_STYLES[theme] || MAP_STYLES.dark;
  
  const handleViewStateChange = useCallback((evt) => {
    setViewState(evt.viewState);
  }, [setViewState]);

  const handleMapLoad = useCallback(() => {
    setMapLoaded(true);
    
    if (mapRef.current) {
      const mapInstance = mapRef.current.getMap();
      
      mapInstance.dragRotate.enable();
      mapInstance.touchZoomRotate.enableRotation();
      mapInstance.keyboard.enable();
      
      mapInstance.on('wheel', (e) => {
        if (e.originalEvent.shiftKey) {
          const currentPitch = mapInstance.getPitch();
          const newPitch = Math.max(0, Math.min(85, currentPitch + e.originalEvent.deltaY * 0.1));
          
          mapInstance.setPitch(newPitch);
          e.preventDefault();
        }
      });
    }
  }, []);
  
  const increasePitch = useCallback(() => {
    if (mapRef.current) {
      const mapInstance = mapRef.current.getMap();
      const currentPitch = mapInstance.getPitch();
      const newPitch = Math.min(85, currentPitch + 10);
      mapInstance.easeTo({ pitch: newPitch, duration: 300 });
    }
  }, []);
  
  const decreasePitch = useCallback(() => {
    if (mapRef.current) {
      const mapInstance = mapRef.current.getMap();
      const currentPitch = mapInstance.getPitch();
      const newPitch = Math.max(0, currentPitch - 10);
      mapInstance.easeTo({ pitch: newPitch, duration: 300 });
    }
  }, []);

  return (
    <div className="map-container">
      <Map
        id="mapA"
        {...viewState}
        ref={mapRef}
        onMove={handleViewStateChange}
        onLoad={handleMapLoad}
        style={{ width: "100%", height: "100%" }}
        mapStyle={mapStyle}
        mapboxAccessToken={import.meta.env.VITE_SHELTERHUB_API_KEY_PUB}
        dragRotate={true}
        pitchWithRotate={true}
        attributionControl={false}
        maxPitch={85}
        minPitch={0}
        touchPitch={true}
        keyboard={true}
      >
        <GeolocateControl 
          position="top-left"
          showUserLocation={true}
          trackUserLocation={true}
          style={{ marginTop: "10px" }}
        />
        <FullscreenControl position="top-left" />
        <NavigationControl
          position="top-right"
          showCompass={true}
          showZoom={true}
          visualizePitch={true}
        />
        <ScaleControl position="bottom-right" />

        <Pins
          selectedShelterCardName={selectedShelterCardName}
          setPopupInfo={setPopupInfo}
          shelters={shelters}
        />

        {popupInfo && (
          <Popup
            anchor="bottom"
            longitude={Number(popupInfo.coordinates?.longitude) || 0}
            latitude={Number(popupInfo.coordinates?.latitude) || 0}
            onClose={() => setPopupInfo(null)}
            closeButton={true}
            closeOnClick={false}
            className={`shelter-popup ${theme === 'light' ? 'light-theme' : ''}`}
            maxWidth={windowWidth < 768 ? 300 : 400}
          >
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
          </Popup>
        )}
      </Map>
      
      <div className="pitch-controls">
        <button 
          onClick={increasePitch}
          className="pitch-button pitch-up"
          title="Tilt map up"
        >
          ↑
        </button>
        <button 
          onClick={decreasePitch}
          className="pitch-button pitch-down"
          title="Tilt map down"
        >
          ↓
        </button>
      </div>
    </div>
  );
}

export default SheltersMap;

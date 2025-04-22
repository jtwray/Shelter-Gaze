import * as React from "react";
import { useCallback } from "react";
const TOKEN = import.meta.env.VITE_SHELTERHUB_API_KEY_PUB;
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
}) {
  const onMove = useCallback(({ viewState }) => {
    setViewState?.(viewState);
  }, [setViewState]);

  return (
    <Map
      id="mapA"
      onMove={onMove}
      {...viewState}
      initialViewState={viewState}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/navigation-night-v1"
      mapboxAccessToken={TOKEN}
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

      {popupInfo && (
        <Popup
          anchor="top"
          longitude={Number(popupInfo.coordinates?.longitude) || 0}
          latitude={Number(popupInfo.coordinates?.latitude) || 0}
          onClose={() => setPopupInfo(null)}
          closeButton={true}
          closeOnClick={false}
          className="shelter-popup"
          tipSize={8}
          offsetTop={12}
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
  );
}

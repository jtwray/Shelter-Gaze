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

/**
 * Renders a map using the react-map-gl library. Displays markers on the map for each shelter
 * and allows the user to click on a marker to view more information about the shelter in a popup.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.viewState - The current state of the map view.
 * @param {Function} props.setViewState - Function to update the view state.
 * @param {string} props.selectedShelterCardName - The name of the currently selected shelter card.
 * @param {Function} props.setPopupInfo - Function to set the information to be displayed in the popup.
 * @param {Object} props.popupInfo - Information about the shelter to be displayed in the popup.
 * @returns {JSX.Element} - The rendered component.
 */
export function SheltersMap({
  viewState,
  setViewState,
  selectedShelterCardName,
  setPopupInfo,
  popupInfo,
}) {
  /**
   * Updates the view state with the new center coordinates whenever the map is moved.
   *
   * @param {Object} event - The move event.
   */
  const onMove = useCallback(({ viewState }) => {
    setViewState(viewState);
  }, []);

  return (
    <Map
      id="mapA"
      onMove={onMove}
      {...viewState}
      initialViewState={{
        latitude: 40.7128,
        longitude: -74.006,
        zoom: 9,
        bearing: 0,
        pitch: 60,
      }}
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
      />

      {popupInfo && (
        <Popup
          anchor="top"
          longitude={Number(popupInfo.coordinates.longitude)}
          latitude={Number(popupInfo.coordinates.latitude)}
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
              {popupInfo.services.slice(0, 3).map((service, i) => (
                <span key={i} className="popup-service">{service}</span>
              ))}
              {popupInfo.services.length > 3 && (
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

function Pins({ selectedShelterCardName, setPopupInfo }) {
  return (
    <>
      {SHELTERS.map((shelter, index) => (
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
      ))}
    </>
  );
}

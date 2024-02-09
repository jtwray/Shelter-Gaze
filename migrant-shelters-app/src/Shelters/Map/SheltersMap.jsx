import * as React from "react";

const TOKEN = import.meta.env.VITE_SHELTERHUB_API_KEY;

import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";
// import "./App.css";
import Pin from "./Pin";
import SHELTERS from "../../assets/shelters.json";

export function SheltersMap({
  viewState,
  setViewState,
  selectedShelterCardName,
  setPopupInfo,
  popupInfo,
}) {
  const onMove = React.useCallback(({ viewState }) => {
    const newCenter = [viewState.longitude, viewState.latitude];
    setViewState(newCenter);
  }, []);

  return (
    <>
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
        style={{ width: "50vw", height: "80vh" }}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxAccessToken={TOKEN}
      >
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl
          position="top-right"
          showCompass
          showZoom
          visualizePitch="true"
        />
        <ScaleControl position="bottom-right" />

        <Pins
          selectedShelterCardName={selectedShelterCardName}
          setPopupInfo={setPopupInfo}
        />

        <PopupInfo popupInfo={popupInfo} setPopupInfo={setPopupInfo} />
      </Map>
    </>
  );
}

export function PopupInfo({ popupInfo, setPopupInfo }) {
  return (
    <>
      {popupInfo && (
        <Popup
          anchor="top"
          longitude={Number(popupInfo.coordinates.longitude)}
          latitude={Number(popupInfo.coordinates.latitude)}
          onClose={() => setPopupInfo(null)}

          //   onClick={() => setCurrentShelter(popupInfo)}
        >
          <div>
            {popupInfo.name}
            <br />
            {popupInfo.type} <br />
            {popupInfo.location} |
            <a
              target="_new"
              href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${
                popupInfo.name
              }, ${"New York"}`}
            >
              Wikipedia
            </a>
          </div>
          <img width="100%" src={popupInfo?.image ?? "😎"} />
        </Popup>
      )}
    </>
  );
}

export function Pins({ selectedShelterCardName, setPopupInfo }) {
  return (
    <>
      {" "}
      {SHELTERS.map((shelter, index) => {
        // const selectedShelterCardName == shelter.name ? 40 : 20;
        return (
          <Marker
            key={`marker-${index}`}
            longitude={shelter.coordinates.longitude}
            latitude={shelter.coordinates.latitude}
            anchor="bottom"
            onClick={(e) => {
              // If we let the click event propagates to the map, it will immediately close the popup
              // with `closeOnClick: true`
              e.originalEvent.stopPropagation();
              setPopupInfo(shelter);
            }}
          >
            <Pin size={selectedShelterCardName == shelter.name ? 40 : 20} />
          </Marker>
        );
      })}
    </>
  );
}

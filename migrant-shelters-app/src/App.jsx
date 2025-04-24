import React, { useCallback, useState } from "react";
import { SheltersList } from "./Shelters/SheltersList/SheltersList.jsx";
import { Theme } from "@radix-ui/themes";
import { shelters as _shelters } from "./assets/shelters.js";
import { SheltersMap } from "./Shelters/Map/SheltersMap.jsx";
import { MobileNav } from "./components/MobileNav";
import "./App.css";
import { MapProvider } from "react-map-gl";
// Add back the useWindowSize hook
import { useWindowSize } from "./hooks/useWindowSize.js";

const App = () => {
  const [selectedShelterName, setSelectedShelterName] = useState(null);
  const [shelters] = useState(_shelters);
  const [popupInfo, setPopupInfo] = useState(null);
  const [activeView, setActiveView] = useState("map"); // For mobile view state
  const [viewState, setViewState] = useState({
    latitude: 40.7128,
    longitude: -74.006,
    zoom: 9,
    bearing: 0,
    pitch: 60,
    // Add these optional properties for better control
    minPitch: 0,
    maxPitch: 85,
    minZoom: 2,
    maxZoom: 20
  });
  
  // Get window dimensions from useWindowSize hook
  const [windowWidth, windowHeight] = useWindowSize();

  const onSelectShelter = useCallback(
    (mapRef, { longitude, latitude }, currentShelterName) => {
      if (!mapRef) return;
      mapRef.flyTo({
        center: [longitude, latitude],
        duration: 2000,
        zoom: 12
      });
      setSelectedShelterName(currentShelterName);
      // Switch to map view on mobile when a shelter is selected
      setActiveView("map");
    },
    []
  );

  const onToggleMap = useCallback(() => {
    setActiveView(prev => prev === "map" ? "list" : "map");
  }, []);

  return (
    <Theme
      accentColor="mint"
      grayColor="gray"
      panelBackground="translucent"
      scaling="100%"
      radius="full"
    >
      <div className={`app-container view-${activeView}`}>
        <MapProvider>
          <div className="map-section">
            <SheltersMap
              viewState={viewState}
              setViewState={setViewState}
              popupInfo={popupInfo}
              setPopupInfo={setPopupInfo}
              selectedShelterCardName={selectedShelterName}
              shelters={shelters}
              windowWidth={windowWidth}
              windowHeight={windowHeight}
            />
          </div>
          <div className="list-section">
            <SheltersList
              onSelectShelter={onSelectShelter}
              setPopupInfo={setPopupInfo}
              shelters={shelters}
              windowWidth={windowWidth}
              windowHeight={windowHeight}
            />
          </div>
          <MobileNav
            activeView={activeView}
            onViewChange={setActiveView}
          />
        </MapProvider>
      </div>
    </Theme>
  );
};

export default App;

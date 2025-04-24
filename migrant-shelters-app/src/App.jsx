import React, { useCallback, useState, useEffect } from "react";
import { SheltersList } from "./Shelters/SheltersList/SheltersList.jsx";
import { Theme } from "@radix-ui/themes";
import { shelters as _shelters } from "./assets/shelters.js";
import { SheltersMap } from "./Shelters/Map/SheltersMap.jsx";
import { MobileNav } from "./components/MobileNav";
import { ThemeToggle } from "./components/ThemeToggle";
import "./App.css";
import { MapProvider } from "react-map-gl";
import { useWindowSize } from "./hooks/useWindowSize.js";

const App = () => {
  const [selectedShelterName, setSelectedShelterName] = useState(null);
  const [shelters] = useState(_shelters);
  const [popupInfo, setPopupInfo] = useState(null);
  const [activeView, setActiveView] = useState("map");
  const [theme, setTheme] = useState("dark"); // Default to dark theme
  const [viewState, setViewState] = useState({
    latitude: 40.7128,
    longitude: -74.006,
    zoom: 9,
    bearing: 0,
    pitch: 60,
    minPitch: 0,
    maxPitch: 85,
    minZoom: 2,
    maxZoom: 20
  });
  
  // Set data-theme attribute on document body
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);
  
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
      appearance={theme}
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
              theme={theme}
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
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </MapProvider>
      </div>
    </Theme>
  );
};

export default App;

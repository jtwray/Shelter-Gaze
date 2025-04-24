import React, { useCallback, useState, Suspense, lazy } from "react";
import { Theme } from "@radix-ui/themes";
import { shelters as _shelters } from "./assets/shelters.js";
import { MobileNav } from "./components/MobileNav";
import "./App.css";
import { MapProvider } from "react-map-gl";
import { useWindowSize } from "./hooks/useWindowSize.js";

// Replace static imports with lazy loading
const SheltersList = lazy(() => import("./Shelters/SheltersList/SheltersList.jsx").then(module => ({ 
  default: module.SheltersList 
})));

const SheltersMap = lazy(() => import("./Shelters/Map/SheltersMap.jsx").then(module => ({ 
  default: module.SheltersMap 
})));

// Simple loading components
const MapLoading = () => (
  <div style={{ 
    height: '100%', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    background: 'var(--gray-2)'
  }}>
    <div>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>Loading map...</div>
      <div style={{ 
        width: '150px', 
        height: '4px', 
        background: 'var(--gray-5)', 
        borderRadius: '4px',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <div style={{ 
          width: '40%', 
          height: '100%', 
          background: 'var(--blue-9)',
          position: 'absolute',
          left: '0',
          top: '0',
          borderRadius: '4px',
          animation: 'loading 1.5s infinite ease-in-out'
        }}></div>
      </div>
      <style>{`
        @keyframes loading {
          0% { left: -40%; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  </div>
);

const ListLoading = () => (
  <div style={{ 
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  }}>
    {[1, 2, 3].map(i => (
      <div 
        key={i}
        style={{
          height: '180px',
          background: 'var(--gray-3)',
          borderRadius: '12px',
          opacity: 1 - (i * 0.15)
        }}
      />
    ))}
  </div>
);

const App = () => {
  const [selectedShelterName, setSelectedShelterName] = useState(null);
  const [shelters] = useState(_shelters);
  const [popupInfo, setPopupInfo] = useState(null);
  const [activeView, setActiveView] = useState("map");
  const [viewState, setViewState] = useState({
    latitude: 40.7128,
    longitude: -74.006,
    zoom: 9,
    bearing: 0,
    pitch: 60,
  });
  
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
    >
      <div className={`app-container view-${activeView}`}>
        <MapProvider>
          <div className="map-section">
            <Suspense fallback={<MapLoading />}>
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
            </Suspense>
          </div>
          <div className="list-section">
            <Suspense fallback={<ListLoading />}>
              <SheltersList
                onSelectShelter={onSelectShelter}
                setPopupInfo={setPopupInfo}
                shelters={shelters}
                windowWidth={windowWidth}
                windowHeight={windowHeight}
                onToggleMap={onToggleMap}
                isMapVisible={activeView === "map"}
              />
            </Suspense>
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

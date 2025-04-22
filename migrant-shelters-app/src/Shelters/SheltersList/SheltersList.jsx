import "./shelters-list.css";
import { useMemo, useState } from "react";
import { ScrollArea } from "@radix-ui/themes";
import { CachedCardWithMap } from "../ShelterCard/CachedCard.jsx";
import { useMap } from "react-map-gl";
import { usePagination } from "../../hooks/usePaginate.jsx";
import { LoadingState } from "../../components/LoadingState";
import { Header } from "../../components/Header";

export const SheltersList2 = ({ shelters = [], onSelectShelter, setPopupInfo }) => {
  const mapRef = useMap();
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);

  const serviceCounts = useMemo(() => {
    if (!shelters?.length) return new Map();

    const _serviceCounts = new Map();
    shelters.forEach((obj) => {
      obj.services?.forEach((service) => {
        if (!service) return;
        let _service = service.toLowerCase();
        if (_serviceCounts.has(_service)) {
          _serviceCounts.set(_service, _serviceCounts.get(_service) + 1);
        } else {
          _serviceCounts.set(_service, 1);
        }
      });
    });
    return new Map([..._serviceCounts].sort());
  }, [shelters]);

  const filteredShelters = useMemo(() => {
    if (!activeFilters?.length || !shelters?.length) return shelters || [];

    return shelters.filter(shelter =>
      activeFilters.every(filter =>
        shelter.services?.some(service =>
          service?.toLowerCase() === filter
        )
      )
    );
  }, [shelters, activeFilters]);

  const handleFilterChange = (service) => {
    if (!service) return;
    setActiveFilters(prev => {
      const isAlreadyActive = prev.includes(service);
      if (isAlreadyActive) {
        return prev.filter(f => f !== service);
      }
      return [...prev, service];
    });
  };

  const handleClearFilters = () => {
    setActiveFilters([]);
  };

  const { PageOfCards, PaginationControls } = usePagination(
    filteredShelters,
    3,
    (props) => (
      <CachedCardWithMap
        onSelectShelter={onSelectShelter}
        mapRef={mapRef?.mapA}
        setPopupInfo={setPopupInfo}
        shelter={props}
        key={`${props?.location ?? "_"}-${props?.idx ?? "_"}-${props?.name ?? "_"}`}
        coords={props?.coordinates}
        title={props?.name}
        subheading={props?.type}
        address={props?.location}
        badges={props?.services}
      />
    ),
    setIsLoading
  );

  return (
    <div className="list-panel">
      <Header
        totalShelters={filteredShelters.length}
        services={serviceCounts}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />
      <ScrollArea className="cards-container" scrollbars="vertical">
        {isLoading ? (
          <LoadingState />
        ) : (
          <PageOfCards />
        )}
      </ScrollArea>
      <PaginationControls />
    </div>
  );
};


export const SheltersList = ({ shelters = [], onSelectShelter, setPopupInfo }) => {
  // Preload all map images at the list level
  const [mapData, mapsLoading] = usePreloadedMaps(shelters);
  
  const { PageOfCards, PaginationControls } = usePagination(
    shelters,
    3,
    (props) => (
      <CachedCardWithMap
        // All standard props
        {...props}
        // Pass the pre-cached image instead of fetching it
        cachedMapImage={mapData[props.id]}
        // No need for loading state - images are preloaded
        isLoading={false}
      />
    ),
    setIsLoading
  );
  
  return (
    <div className="list-panel">
      {/* Show loading state only during initial load */}
      {mapsLoading ? <LoadingState /> : (
        <>
          <Header 
            totalShelters={filteredShelters.length} 
            {...otherProps} 
          />
          <ScrollArea className="cards-container" scrollbars="vertical">
            <PageOfCards />
          </ScrollArea>
          <PaginationControls />
        </>
      )}
    </div>
  );
};
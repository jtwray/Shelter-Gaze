import "./shelters-list.css";
import { useMemo, useState } from "react";
import { ScrollArea } from "@radix-ui/themes";
import { CachedCardWithMap } from "../ShelterCard/CachedCard.jsx";
import { useMap } from "react-map-gl";
import { usePagination } from "../../hooks/usePaginate.jsx";
import { LoadingState } from "../../components/LoadingState";
import { Header } from "../../components/Header";
import { usePreloadedMaps } from "../../hooks/usePreloadedMaps";

export const SheltersList = ({ shelters = [], onSelectShelter, setPopupInfo, windowWidth, windowHeight }) => {
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

  const [mapData, mapsLoading] = usePreloadedMaps(filteredShelters);

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

  const combinedIsLoading = isLoading || mapsLoading;

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
        cachedMapImage={mapData[props.id || props.name]}
        windowWidth={windowWidth}
        windowHeight={windowHeight}
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
        {combinedIsLoading ? (
          <LoadingState />
        ) : (
          <PageOfCards />
        )}
      </ScrollArea>
      <PaginationControls />
    </div>
  );
};
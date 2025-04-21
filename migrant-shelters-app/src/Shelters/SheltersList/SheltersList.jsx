import "./shelters-list.css";
import { useMemo, useState } from "react";
import { Flex, ScrollArea } from "@radix-ui/themes";
import { CardWithMap } from "../ShelterCard/Card.jsx";
import { useMap } from "react-map-gl";
import { usePagination } from "../../hooks/usePaginate.jsx";
import { LoadingState } from "../../components/LoadingState";
import { FilterBadges } from "../../components/FilterBadges";

export const SheltersList = ({ shelters, onSelectShelter, setPopupInfo }) => {
  const mapRef = useMap();
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);

  const serviceCounts = useMemo(() => {
    const _serviceCounts = new Map();
    shelters.forEach((obj) => {
      obj.services.forEach((service) => {
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
    if (activeFilters.length === 0) return shelters;
    return shelters.filter(shelter =>
      activeFilters.every(filter =>
        shelter.services.some(service => service.toLowerCase() === filter)
      )
    );
  }, [shelters, activeFilters]);

  const handleFilterChange = (service) => {
    setActiveFilters(prev => {
      const isAlreadyActive = prev.includes(service);
      if (isAlreadyActive) {
        return prev.filter(f => f !== service);
      }
      return [...prev, service];
    });
  };

  const { PageOfCards, PaginationControls } = usePagination(
    filteredShelters,
    3,
    (props) => (
      <CardWithMap
        onSelectShelter={onSelectShelter}
        mapRef={mapRef.mapA}
        setPopupInfo={setPopupInfo}
        shelter={props}
        key={`${props.location ?? "_"}-${props.idx ?? "_"}-${props.name ?? "_"}`}
        coords={props.coordinates}
        title={props.name}
        subheading={props.type}
        address={props.location}
        badges={props.services}
      />
    ),
    setIsLoading
  );

  return (
    <div className="list-panel">
      <Flex direction="column" gap="4" p="4">
        <FilterBadges
          services={serviceCounts}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
        />
      </Flex>
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

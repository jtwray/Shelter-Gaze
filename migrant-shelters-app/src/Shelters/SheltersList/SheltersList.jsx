import "./shelters-list.css";
import { useMemo, useState, useCallback } from "react";
import { ScrollArea } from "@radix-ui/themes";
import { CachedCardWithMap } from "../ShelterCard/CachedCard.jsx";
import { useMap } from "react-map-gl";
import { usePagination } from "../../hooks/usePaginate.jsx";
import { LoadingState } from "../../components/LoadingState";
import { Header } from "../../components/Header";
import { usePreloadedMaps } from "../../hooks/usePreloadedMaps";
import { serviceInBucket, getServicesInBucket } from "../../utils/servicebuckets";

export const SheltersList = ({ shelters = [], onSelectShelter, setPopupInfo, windowWidth, windowHeight }) => {
  const mapRef = useMap();
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const [activeBuckets, setActiveBuckets] = useState([]);

  // Get service counts for filter options
  const serviceCounts = useMemo(() => {
    const counts = new Map();
    shelters.forEach((shelter) => {
      shelter.services?.forEach((service) => {
        counts.set(service, (counts.get(service) || 0) + 1);
      });
    });
    return counts;
  }, [shelters]);

  // Apply filters to shelter list
  const filteredShelters = useMemo(() => {
    if (activeFilters.length === 0 && activeBuckets.length === 0) {
      return shelters;
    }

    // Create a set of all services to filter by (individual + from buckets)
    const filterServices = new Set(activeFilters);

    // Add all services from active buckets
    activeBuckets.forEach(bucketName => {
      const bucketServices = getServicesInBucket(bucketName);
      bucketServices.forEach(service => filterServices.add(service));
    });


    const activeBucketFilters = [];
    activeBuckets.forEach(bucketName => {
      const bucketServices = getServicesInBucket(bucketName);
      bucketServices.forEach(service => activeBucketFilters.push(service.toLowerCase()));
    });
    const sheltersWithServicesWithinActiveBuckets = shelters.filter(shelter => shelter.services?.some(service => activeBucketFilters.includes(service.toLowerCase())));
    const shelterservices = shelters.map(shelter => shelter.services);

    console.log("activeBucketFilters", activeBucketFilters);
    console.log("sheltersWithServicesWithinActiveBuckets", sheltersWithServicesWithinActiveBuckets);


    // Filter shelters that have any of the selected services
    return shelters.filter((shelter) =>
      shelter.services?.some((service) => filterServices.has(service.toLowerCase())));
  }, [shelters, activeFilters, activeBuckets]);

  // Handle filter changes - memoized to prevent re-renders
  const handleFilterChange = useCallback((service) => {
    setActiveFilters((prev) => {
      if (prev.includes(service)) {
        return prev.filter((s) => s !== service);
      } else {
        return [...prev, service];
      }
    });
  }, []);

  // Handle bucket filter changes - memoized to prevent re-renders
  const handleBucketChange = useCallback((bucketName) => {
    setActiveBuckets((prev) => {
      if (prev.includes(bucketName)) {
        return prev.filter((b) => b !== bucketName);
      } else {
        // When adding a bucket, remove any individual services that are part of this bucket
        setActiveFilters((services) =>
          services.filter((service) => !serviceInBucket(service, bucketName))
        );
        return [...prev, bucketName];
      }
    });
  }, []);

  // Clear all filters - memoized to prevent re-renders
  const handleClearFilters = useCallback(() => {
    setActiveFilters([]);
    setActiveBuckets([]);
  }, []);

  // Preload all map images at the list level
  const [mapData, mapsLoading] = usePreloadedMaps(filteredShelters);

  // Set loading state based on both pagination and map preloading
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
        activeBuckets={activeBuckets}
        onFilterChange={handleFilterChange}
        onBucketChange={handleBucketChange}
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
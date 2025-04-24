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
  const [filterMode, setFilterMode] = useState("any"); // "any" or "all"

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
    // If no filters are active, return all shelters
    if (activeFilters.length === 0 && activeBuckets.length === 0) {
      return shelters;
    }

    // Helper function to normalize strings (lowercase, trim whitespace)
    const normalize = str => str.toLowerCase().trim();

    // Create a set of all services to filter by (individual + from buckets)
    const filterServices = new Set();
    
    // Add individual filters with normalization
    activeFilters.forEach(service => {
      filterServices.add(normalize(service));
    });

    // Add all services from active buckets with normalization
    activeBuckets.forEach(bucketName => {
      const bucketServices = getServicesInBucket(bucketName);
      // Debug specific buckets
      if (bucketName === "Employment") {
        console.log(`Services in ${bucketName} bucket:`, bucketServices);
      }
      
      bucketServices.forEach(service => {
        const normalizedService = normalize(service);
        filterServices.add(normalizedService);
      });
    });

    // Log the final set of services we're filtering by
    console.log("All filter services:", [...filterServices]);
    
    // Helper function to get normalized shelter services
    const getNormalizedShelterServices = shelter => {
      if (!shelter.services || shelter.services.length === 0) return [];
      return shelter.services.map(normalize);
    };
    
    // Filter the shelters based on mode
    const results = shelters.filter(shelter => {
      const normalizedShelterServices = getNormalizedShelterServices(shelter);
      
      // Skip shelters with no services
      if (normalizedShelterServices.length === 0) return false;
      
      if (filterMode === "all") {
        // Must match ALL selected services
        for (const service of filterServices) {
          if (!normalizedShelterServices.includes(service)) {
            return false;
          }
        }
        return true;
      } else {
        // Must match ANY selected service
        for (const service of filterServices) {
          if (normalizedShelterServices.includes(service)) {
            return true;
          }
        }
        return false;
      }
    });
    
    console.log(`Filter mode: ${filterMode}, Results: ${results.length}`);
    return results;
  }, [shelters, activeFilters, activeBuckets, filterMode]);

  // Handle filter mode change
  const handleToggleFilterMode = useCallback((mode) => {
    setFilterMode(prevMode=>prevMode==='any'?'all':'any');
  }, []);

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
        filterMode={filterMode}
        onFilterChange={handleFilterChange}
        onBucketChange={handleBucketChange}
        onClearFilters={handleClearFilters}
        handleToggleFilterMode={handleToggleFilterMode}
      />
      <ScrollArea className="cards-container" scrollbars="vertical">
        {combinedIsLoading ? (
          <LoadingState />
        ) : (
          <div className="optimized-cards-grid">
            <PageOfCards />
          </div>
        )}
      </ScrollArea>
      <div className="pagination-wrapper">
        <PaginationControls />
      </div>
    </div>
  );
};
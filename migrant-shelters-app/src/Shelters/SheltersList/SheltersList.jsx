import "./shelters-list.css";
import { useMemo, useState } from "react";
import { Flex, Heading, ScrollArea } from "@radix-ui/themes";
import { CardWithMap } from "../ShelterCard/Card.jsx";
import { useMap } from "react-map-gl";
import { usePagination } from "../../hooks/usePaginate.jsx";
import { LoadingState } from "../../components/LoadingState";

export const SheltersList = ({ shelters, onSelectShelter, setPopupInfo }) => {
  const mapRef = useMap();
  const [isLoading, setIsLoading] = useState(false);

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

  const { PageOfCards, PaginationControls } = usePagination(
    shelters,
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
    setIsLoading // Pass setIsLoading to handle loading states during pagination
  );

  return (
    <div className="list-panel">
      <Flex p="4" justify="between" align="center">
        <Heading size="4">Available Shelters ({shelters.length})</Heading>
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

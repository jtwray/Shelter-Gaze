import "./shelters-list.css";
import { useMemo } from "react";
import { Flex } from "@radix-ui/themes";
import { CardWithMap } from "../ShelterCard/Card.jsx";
import { useMap } from "react-map-gl";

export function SheltersList({ onSelectShelter, shelters, setPopupInfo }) {
  const mapRef = useMap();
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
    // return Array.from(_serviceCounts).sort(
    //   ([keyA, countA], [keyB, countB]) => keyA > keyB
    // );
  }, [shelters]);
  // console.log(serviceCounts);

  return (
    <div id="shelters-container">
      <Flex direction="column" gap="3">
        {shelters.map((eachShelter, idx) => (
          <CardWithMap
            onSelectShelter={onSelectShelter}
            mapRef={mapRef.mapA}
            setPopupInfo={setPopupInfo}
            shelter={eachShelter}
            key={`${eachShelter.location ?? "_"}-${idx ?? "_"}-${
              eachShelter.name ?? "_"
            }`}
            coords={eachShelter.coordinates}
            title={eachShelter.name}
            subheading={eachShelter.type}
            address={eachShelter.location}
            badges={eachShelter.services}
          />
        ))}
      </Flex>
    </div>
  );
}

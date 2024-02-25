import "./shelters-list.css";
import { useMemo } from "react";
import { Flex } from "@radix-ui/themes";
import { CardWithMap } from "../ShelterCard/Card.jsx";
import { useMap } from "react-map-gl";
import { usePagination } from "../../hooks/usePaginate.jsx";

const SheltersList = ({ shelters, onSelectShelter, setPopupInfo }) => {
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
  const pageSize = 3; // You can adjust the pageSize as needed

  // Using the usePagination hook
  const { PageOfCards, PaginationControls } = usePagination(
    shelters,
    pageSize,
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
    )
  );

  return (
    <div id="shelters-container">
      <Flex direction="column" gap="3">
        <PageOfCards />
      </Flex>
      <PaginationControls />
    </div>
  );
};

export { SheltersList };

// /**

//  * chunking function takes the list of objects and the preferred size later we could set it depending on screen size or on user selected dropdown
//  * set the shelters to a hash of indexes
//  *
//  * data: list of shelterObjects
//  *
//  * computed state:
//  * shelters
//  * availablePages
//  * currentPage
//  *
//  * calculate in the render( not in state) :
//  *    - calculate the sheltersToShow using the current page from the collection of available pages
//  *    - ie: const pageToShow=availablePages[currentPage]
//  *
//  *
//  *
//  * component tree:
//  * PageOfCards
//  * Card
//  * PaginationControls
//  * Button(Back/...4,5,6.../Forward)
//  *
//  * view elements:
//  * collection of cards
//  * collection of pagebuttons as numbers
//  * back / forward button (when logical)
//  *
//  * */

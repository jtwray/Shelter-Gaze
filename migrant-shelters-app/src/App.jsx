// eslint-disable-next-line no-unused-vars
import React, { useRef, useEffect, useState, useCallback } from "react";
import { SheltersList } from "./Shelters/SheltersList/SheltersList.jsx";
import { Flex, Theme } from "@radix-ui/themes";
import { shelters as _shelters } from "./assets/shelters.js";
import { SheltersMap } from "./Shelters/Map/SheltersMap.jsx";
import "./App.css";
import { MapProvider } from "react-map-gl";
import { useBrowserGPS } from "./hooks/useBrowserGPS.js";

const App = () => {
  const [selectedShelterName, setSelectedShelterName] = useState(() => 0);
  const [shelters, setShelters] = useState(() => _shelters);
  const [lat, setLat] = useState(36.7034368);
  const [lng, setLng] = useState(-79.8425088);
  const currentGeoLocation = useBrowserGPS("single");
  const [popupInfo, setPopupInfo] = useState(null);
  const [viewState, setViewState] = React.useState({
    latitude: 40.7128,
    longitude: -74.006,
    zoom: 9,
    bearing: 0,
    pitch: 60,
  });
  const onSelectShelter = useCallback(
    (mapRef, { longitude, latitude }, currentShelterName) => {
      mapRef.flyTo({ center: [longitude, latitude], duration: 2000, zoom: 12 });
      setSelectedShelterName(currentShelterName);
    },
    []
  );

  return (
    <Theme
      accentColor="mint"
      grayColor="gray"
      panelBackground="translucent"
      scaling="100%"
      radius="full"
    >
      <Flex>
        <MapProvider>
          <SheltersMap
            viewState={viewState}
            setViewState={setViewState}
            popupInfo={popupInfo}
            setPopupInfo={setPopupInfo}
            selectedShelterCardName={selectedShelterName}
          />
          <SheltersList
            className="testComponentClassName"
            viewState={viewState}
            setViewState={setViewState}
            lat={lat}
            lng={lng}
            setLat={setLat}
            setLng={setLng}
            setPopupInfo={setPopupInfo}
            popupInfo={popupInfo}
            onSelectShelter={onSelectShelter}
            shelters={_shelters ?? staticSheltersList}
          />{" "}
        </MapProvider>
      </Flex>
    </Theme>
  );
};

export default App;

/*
map

markers

browser gps



 */
const staticSheltersList = [
  {
    name: "Grand Central Neighborhood",
    location: "143 East 43rd Street, New York, NY 10017",
    type: "Drop-In Center",
    services: [
      "Hot meals",
      "Showers",
      "Laundry facilities",
      "Clothing",
      "Medical care",
      "Recreational space",
      "Employment referrals",
      "Other social services",
    ],
    coordinates: {
      latitude: 40.751205,
      longitude: -73.975423,
    },
  },

  {
    name: "Grand Central Neighborhood",
    location: "144 East 43rd Street, New York, NY 10017",
    type: "Drop-In Center",
    services: [
      "Hot meals",
      "Showers",
      "Laundry facilities",
      "Clothing",
      "Medical care",
      "Recreational space",
      "Employment referrals",
      "Other social services",
    ],
    coordinates: {
      latitude: 40.751205,
      longitude: -73.975423,
    },
  },

  {
    name: "Grand Central Neighborhood",
    location: "145 East 43rd Street, New York, NY 10017",
    type: "Drop-In Center",
    services: [
      "Hot meals",
      "Showers",
      "Laundry facilities",
      "Clothing",
      "Medical care",
      "Recreational space",
      "Employment referrals",
      "Other social services",
    ],
    coordinates: {
      latitude: 40.751205,
      longitude: -73.975423,
    },
  },

  {
    name: "Grand Central Neighborhood",
    location: "146 East 43rd Street, New York, NY 10017",
    type: "Drop-In Center",
    services: [
      "Hot meals",
      "Showers",
      "Laundry facilities",
      "Clothing",
      "Medical care",
      "Recreational space",
      "Employment referrals",
      "Other social services",
    ],
    coordinates: {
      latitude: 40.751205,
      longitude: -73.975423,
    },
  },

  {
    name: "Grand Central Neighborhood",
    location: "147 East 43rd Street, New York, NY 10017",
    type: "Drop-In Center",
    services: [
      "Hot meals",
      "Showers",
      "Laundry facilities",
      "Clothing",
      "Medical care",
      "Recreational space",
      "Employment referrals",
      "Other social services",
    ],
    coordinates: {
      latitude: 40.751205,
      longitude: -73.975423,
    },
  },
];

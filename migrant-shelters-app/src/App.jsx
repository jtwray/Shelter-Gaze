// eslint-disable-next-line no-unused-vars
import React, { useRef, useEffect, useState } from "react";
import { SheltersList } from "./Shelters/SheltersList";

// import Map from "./Map.jsx";
import { shelters as _shelters } from "./assets/shelters.js";
// import { Avatar, Badge, Box, Flex, IconButton,Card } from "@radix-ui/themes";

// const api__key = import.meta.env.VITE_SOME_KEY;
// const viteenvvars = import.meta;
// console.log(import.meta.env.VITE_SOME_KEY, { api__key, viteenvvars });
import { Map } from "./Map/Map";

const App = () => {
  const [selectedShelter, setSelectedShelter] = useState(() => 0);
  const [shelters, setShelters] = useState(() => _shelters);
  return (
    <>

      <Map
        selectedShelter={shelters[0]}
        onMarkerClick={(e) => setSelectedShelter(e.target.id)}
        shelters={_shelters}
      />
      <SheltersList
        shelters={[
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
        ]}
      />
    </>
  );
};

export default App;

/*
map

markers

browser gps



 */

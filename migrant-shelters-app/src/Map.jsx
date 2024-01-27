/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
// // import React from "react";
// import { Marker, Popup } from "react-map-gl";
// import { Map as ReactMap } from "react-map-gl/maplibre";

// const Map = ({ shelters, selectedShelter, onMarkerClick }) => {
//   const mapStyle = "mapbox://styles/mapbox/streets-v11";

//   return (
//     <ReactMap
//       style={mapStyle}
//       containerStyle={{
//         height: "400px",
//         width: "100%",
//       }}
//       center={[-74.006, 40.7128]} // Default to New York coordinates
//     >
//       {shelters.map((shelter, index) => (
//         <Marker
//           key={index}
//           coordinates={shelter.coords}
//           anchor="bottom"
//           onClick={() => onMarkerClick(index)}
//         >
//           <img
//             src="https://placekitten.com/50/50" // Replace with your custom marker icon
//             alt={`Marker ${index}`}
//           />
//         </Marker>
//       ))}

//       {selectedShelter !== null && (
//         <Popup
//           coordinates={shelters[selectedShelter].coords}
//           offset={{
//             "bottom-left": [12, -38],
//             bottom: [0, -38],
//             "bottom-right": [-12, -38],
//           }}
//         >
//           <h3>{shelters[selectedShelter].name}</h3>
//           <p>{shelters[selectedShelter].address}</p>
//         </Popup>
//       )}
//     </ReactMap>
//   );
// };

// export default Map;
// Map.js
import React from "react";
import { Marker, Popup } from "react-map-gl";
import ReactMapGL from "react-map-gl";

const Map = ({ shelters, selectedShelter, onMarkerClick }) => {
  //   const mapStyle = 'mapbox://styles/mapbox/streets-v11';

  return (
    <ReactMapGL
accessToken="pk.eyJ1IjoiamFtZXN0dWNrZXJ3cmF5IiwiYSI6ImNscnRjMmYzbzA1NWIya2xlNW55Z2pha2oifQ.lQCzIHBVRU92ZWzSakvSPw"
    width="100%"
      height="400px"
      latitude={40.7128}
      longitude={-74.006}
      zoom={10}
    >
      {shelters?.map((shelter, index) => (
        <Marker
          key={index}
          latitude={shelter.coords[1]}
          longitude={shelter.coords[0]}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <img
            src="https://placekitten.com/50/50" // Replace with your custom marker icon
            alt={`Marker ${index}`}
            onClick={() => onMarkerClick(index)}
          />
        </Marker>
      ))}

      {selectedShelter !== null && (
        <Popup
          latitude={shelters[selectedShelter].coords[1]}
          longitude={shelters[selectedShelter].coords[0]}
          closeButton={true}
          closeOnClick={false}
          onClose={() => onMarkerClick(null)}
          anchor="left"
        >
          <h3>{shelters[selectedShelter].name}</h3>
          <p>{shelters[selectedShelter].address}</p>
        </Popup>
      )}
    </ReactMapGL>
  );
};

export default Map;

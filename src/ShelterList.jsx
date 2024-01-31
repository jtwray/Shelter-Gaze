// // eslint-disable-next-line no-unused-vars
// import React from 'react';
// import ShelterCard from './ShelterCard';


// const ShelterList = ({shelters}) => {
//   return (
//     <div>
//       <h2>Shelters Near New York</h2>
//       {shelters?.map((shelter, index) => (
//         <ShelterCard key={index} {...shelter} />
//       ))} Fl Tl fj ft {..} {. .} []  * *  
//     </div> */
// };

// export default ShelterList;
// ShelterList.js
import React from 'react';
import ShelterCard from './ShelterCard';

const shelters = [
  {
    name: 'Shelter 1',
    address: '123 Main St, New York, NY',
    coords: [-74.006, 40.7128],
    hours: '9:00 AM - 5:00 PM',
    requirements: 'Valid ID, proof of employment',
  },
 
];

const ShelterList = () => {
  return (
    <div>
      <h2>Shelters Near New York</h2>
      {shelters.map((shelter, index) => (
        <ShelterCard key={index} {...shelter} />
      ))}
    </div>
  );
};

export default ShelterList;

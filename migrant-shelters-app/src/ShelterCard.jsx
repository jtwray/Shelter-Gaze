/* eslint-disable react/prop-types */
// import React from 'react';

const ShelterCard = ({ name, address, coords, hours, requirements }) => {
  return (
    <div>
      <h3>{name}</h3>
      <p>{address}</p>
      <p>Coordinates: {coords.join(', ')}</p>
      <p>Hours: {hours}</p>
      <p>Requirements: {requirements}</p>
    </div>
  );
};

export default ShelterCard;

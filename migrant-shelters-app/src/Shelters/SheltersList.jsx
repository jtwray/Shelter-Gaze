// import shelters from '../assets/shelters.js'
import { ShelterCard } from "./ShelterCard.jsx";
export function SheltersList({ shelters }) {
  return (
    <>
      {shelters.map((eachShelter, idx) => (
        <ShelterCard shelter={eachShelter} />
      ))}
    </>
  );
}

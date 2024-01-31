
export function ShelterCard({ shelter }) {
    const { name, location, type, services } = shelter;
    // const { name, location, type, services, coordinates: { latitude, longitude } } = shelter;
    // const { name, location, type, services, coordinates: { latitude, longitude } } = shelters[0];
    return (<>
        {/* {    shelters[0]} */}

        {name} {location} {type} {services}
        {/* {latitude} {longitude} */}
    </>)
}
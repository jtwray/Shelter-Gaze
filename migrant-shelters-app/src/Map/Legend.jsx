import { LayerControls } from "./LayerControls"
export function Legend() {
    return (<>
        <div className="sidebar">
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}| map style:{" "}
            <LayerControls
                mapStyle={mapStyle}
                layers={layers}
                handleSelectMapStyle={handleSelectMapStyle}
                layerIcons={layerIcons}
            />
        </div>
    </>
    )
}
import { IconButton } from "@radix-ui/themes";
import satelliteIcon from "./assets/satellite.svg";
import outdoorsIcon from "./assets/outdoors.svg";
import sunIcon from "./assets/sun.svg";
import darkIcon from "./assets/dark.svg";

const layerIcons = {
    "satellite-streets-v12": satelliteIcon,
    "light-v11": sunIcon,
    "dark-v11": darkIcon,
    "outdoors-v12": outdoorsIcon,
};
const layers = [
    "satellite-streets-v12",
    "light-v11",
    "dark-v11",
    "outdoors-v12",
];
export function LayerControls({
    layers,
    handleSelectMapStyle,
    mapStyle,
    layerIcons,
}) {
    return (
        <div style={{ display: "flex", gap: 5 }}>
            {layers.map((layer) => (
                <IconButton
                    key={layer}
                    size="1"
                    variant={mapStyle === layer ? "solid" : "soft"}
                    color={mapStyle === layer ? "crimson" : "white"}
                    onClick={() => handleSelectMapStyle(layer)}
                >
                    <img
                        src={layerIcons[layer]}
                        width="50"
                        height="50"
                        style={{ color: mapStyle === layer ? "crimson" : "white" }}
                    />
                </IconButton>
            ))}
        </div>
    );
}
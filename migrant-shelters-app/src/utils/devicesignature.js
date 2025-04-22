export const getDeviceSignature = () => ({
    pixelRatio: window.devicePixelRatio || 1,
    orientation: window.screen.orientation.type,
    width: window.screen.width,
    height: window.screen.height
});


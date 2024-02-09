export function usePosition() {}

/** @format */

import { useCallback, useEffect, useState } from "react";

export const GeolocationMode = {
  SINGLE: "single",
  WATCH: "watch",
};
const defaultGeolocationConfig = {
  timeout: 12000,
  maximumAge: 60000,
  enableHighAccuracy: true,
};

export function useBrowserGPS(_mode) {
  let mode = `${_mode}`.toLowerCase();
  let stop = false;
  let config = defaultGeolocationConfig;
  const [positionState, setPositionState] = useState({
    position: null,
    positionError: null,
    positionLoading: true,
    previousPositions: [],
  });

  const onGeolocationSuccess = useCallback(
    (position) => {
      if (!stop) {
        setPositionState((oldState) => ({
          ...oldState,
          position,
          previousPositions:
            mode === GeolocationMode.SINGLE
              ? [oldState.position]
              : [
                  ...(oldState.previousPositions
                    ? oldState.previousPositions
                    : []),
                  oldState.position,
                ],
        }));
      }
    },
    [setPositionState, mode, stop]
  );

  const onGeolocationError = useCallback(
    (error) => setPositionState((oldState) => ({ ...oldState, error })),
    [setPositionState]
  );

  useEffect(() => {
    if (mode === GeolocationMode.SINGLE) {
      navigator.geolocation.getCurrentPosition(
        onGeolocationSuccess,
        onGeolocationError,
        config
      );
    } else if (mode === GeolocationMode.WATCH) {
      navigator.geolocation.watchPosition(
        onGeolocationSuccess,
        onGeolocationError,
        config
      );
    }
  }, [mode, stop, onGeolocationSuccess, onGeolocationError, config]);

  return positionState;
}

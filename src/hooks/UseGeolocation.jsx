import { useCallback } from "react";
import useWeatherStore from "../store/WeatherStore";

/**
 * Accesses the browser Geolocation API and integrates with the weather store.
 * - getCurrentLocation: requests the user's position and fetches weather
 *
 * @returns {Function} getCurrentLocation - function to get current location and fetch weather
 */
const useGeolocation = () => {
  const fetchWeatherByGeolocation = useWeatherStore(
    (state) => state.fetchWeatherByGeolocation
  );

  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Fetching weather for your current location...");
        fetchWeatherByGeolocation(position);
      },
      (error) => {
        console.error(
          error.message ||
            "Geolocation permission denied. Please search for a location."
        );
      },
      { enableHighAccuracy: true, maximumAge: 0 }
    );
  }, [fetchWeatherByGeolocation]);

  return { getCurrentLocation };
};

export default useGeolocation;
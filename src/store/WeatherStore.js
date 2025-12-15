import { searchLocation, getLocationDetails, getWeather } from "../api/fetchapi"
import { create } from "zustand"
import { persist } from "zustand/middleware";

const useWeatherStore = create()(
  persist(
    (set, get) => ({
      weatherData: null,
      isFetching: false,
      isError: false,
      errorMessage: null,
      location: null, 
      searchResults: [], 
      units: {
        temperature_unit: "celsius",
        wind_speed_unit: "kmh",
        precipitation_unit: "mm",
      },
      
      setUnits: (newUnits) => set({ 
        units: { ...get().units, ...newUnits }, 
        weatherData: null 
      }),
      
      // Search for locations by name (returns multiple results)
      searchLocations: async (locationName) => {
        if (!locationName) return;
        
        set({ isFetching: true, isError: false, errorMessage: null });
        
        try {
          const results = await searchLocation(locationName);
          
          set({ 
            searchResults: results,
            isFetching: false, 
            isError: false 
          });
          
          return results;
        } catch (error) {
          set({ 
            isFetching: false, 
            isError: true,
            errorMessage: error.message,
            searchResults: []
          });
          return [];
        }
      },
      
      // Fetch weather by location name (uses first search result)
      fetchWeatherByName: async (locationName) => {
        if (!locationName) return;
        
        set({ isFetching: true, isError: false, errorMessage: null });
        
        try {
          const results = await searchLocation(locationName);
          
          if (results.length === 0) {
            throw new Error(`No results found for "${locationName}"`);
          }
          
          // Use first result (or you can let user choose)
          const selectedLocation = results[0];
          
          const state = get();
          const weatherData = await getWeather(
            selectedLocation.latitude, 
            selectedLocation.longitude, 
            state.units
          );
          
          set({ 
            location: selectedLocation,
            weatherData, 
            isFetching: false, 
            isError: false,
            searchResults: [] // Clear search results after selecting
          });
        } catch (error) {
          set({ 
            isFetching: false, 
            isError: true,
            errorMessage: error.message 
          });
        }
      },
      
      // Fetch weather for a specific location object (when user selects from search results)
      fetchWeatherForLocation: async (locationObject) => {
        set({ isFetching: true, isError: false, errorMessage: null });
        
        try {
          const state = get();
          const weatherData = await getWeather(
            locationObject.latitude, 
            locationObject.longitude, 
            state.units
          );
          
          set({ 
            location: locationObject,
            weatherData, 
            isFetching: false, 
            isError: false,
            searchResults: [] // Clear search results after selecting
          });
        } catch (error) {
          set({ 
            isFetching: false, 
            isError: true,
            errorMessage: error.message 
          });
        }
      },

      // Fetch weather using browser geolocation
      fetchWeatherByGeolocation: async (position) => {
        set({ isFetching: true, isError: false, errorMessage: null });

        try {
          const { latitude, longitude } = position.coords; 

          const locationDetails = await getLocationDetails(latitude, longitude);

          const state = get();
          const weatherData = await getWeather(
            latitude,
            longitude,
            state.units
          );

          set({
            location: locationDetails,
            weatherData,
            isFetching: false,
            isError: false,
          });

        } catch (error) {
          set({
            isFetching: false,
            isError: true,
            errorMessage: error.message || "Failed to get weather by geolocation.",
          });
        }
      },
      
      clearWeatherData: () => set({ 
        weatherData: null, 
        location: null,
        searchResults: []
      }),
      
      clearError: () => set({ 
        isError: false, 
        errorMessage: null 
      }),
      
      clearSearchResults: () => set({
        searchResults: []
      })
    }),
    {
      name: 'weather-storage',
    }
  )
);

export default useWeatherStore;
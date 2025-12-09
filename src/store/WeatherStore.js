import { getCoordinates, getWeather } from "../api/fetchapi"
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
      units: {
        temperature_unit: "celsius",
        wind_speed_unit: "kmh",
        precipitation_unit: "mm",
      },
      
      setUnits: (newUnits) => set({ 
        units: { ...get().units, ...newUnits }, 
        weatherData: null 
      }),
      
      fetchWeather: async (locationName) => {
        if (!locationName) return;
        
        set({ isFetching: true, isError: false, errorMessage: null });
        
        try {
          const geoData = await getCoordinates(locationName);
          
          const state = get();
          const weatherData = await getWeather(
            geoData.latitude, 
            geoData.longitude, 
            state.units
          );
          
          set({ 
            location: geoData,
            weatherData, 
            isFetching: false, 
            isError: false 
          });
        } catch (error) {
          set({ 
            isFetching: false, 
            isError: true,
            errorMessage: error.message 
          });
        }
      },
      
      clearWeatherData: () => set({ 
        weatherData: null, 
        location: null 
      }),
      
      clearError: () => set({ 
        isError: false, 
        errorMessage: null 
      })
    }),
    {
      name: 'weather-storage',
    }
  )
);

export default useWeatherStore;
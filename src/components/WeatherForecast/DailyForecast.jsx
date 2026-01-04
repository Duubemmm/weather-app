import { useMemo } from "react";
import useWeatherStore from "../../store/WeatherStore";
import DailyForecastCard from "./DailyForecastCard";

/**
 * DailyForecast Component
 * 
 * PURPOSE: Orchestrates 7-day weather forecast display
 * 
 * RESPONSIBILITIES:
 * - Fetches daily forecast data from Zustand store
 * - Transforms raw API data into component-ready format
 * - Maps each day to a DailyForecastCard
 * - Handles loading, error, and empty states
 * - Identifies "today" for highlighting
 * - Formats dates and times for display
 * 
 * DATA FLOW:
 * 1. Subscribe to weatherStore
 * 2. Extract weatherData.daily (7-day forecast)
 * 3. useMemo: Transform data (avoid recalculations)
 * 4. Map transformed data to DailyForecastCard components
 * 
 * COMPONENT ARCHITECTURE:
 * - Container component (business logic)
 * - Delegates presentation to DailyForecastCard
 * - Responsive grid layout
 * 
 * API DATA STRUCTURE (weatherData.daily):
 * {
 *   time: ["2026-01-04", "2026-01-05", ...],
 *   weather_code: [0, 2, 61, ...],
 *   temperature_2m_max: [15.2, 13.8, ...],
 *   temperature_2m_min: [8.4, 7.1, ...],
 *   sunrise: ["2026-01-04T07:15", ...],
 *   sunset: ["2026-01-04T17:30", ...],
 *   precipitation_probability_max: [10, 30, 80, ...]
 * }
 */

const DailyForecast = () => {
  /**
   * STORE SUBSCRIPTION
   * Extracts weather data, location, units, and loading states
   * Component re-renders when any of these values change
   */
  const { weatherData, location, isFetching, isError, errorMessage, units } = useWeatherStore();

  /**
   * MEMOIZED DATA TRANSFORMATION
   * Expensive operation - only recalculates when dependencies change
   * Prevents unnecessary re-renders and calculations
   * 
   * TRANSFORMATION STEPS:
   * 1. Check if daily forecast exists
   * 2. Get today's date for comparison
   * 3. Map each day's data to structured object
   * 4. Format dates and times
   * 5. Calculate day names (Today, Tomorrow, Day of Week)
   */
  const forecastDays = useMemo(() => {
    // GUARD: Return empty array if no data
    if (!weatherData?.daily) return [];

    const daily = weatherData.daily;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to midnight for comparison

    /**
     * ARRAY MAPPING: Transform parallel arrays to object array
     * Open-Meteo returns data as parallel arrays (all temps in one array, etc.)
     * We transform to array of objects (one object per day)
     * 
     * ITERATION: Loop through each day (index i)
     */
    return daily.time.map((dateStr, i) => {
      const forecastDate = new Date(dateStr); // Parse ISO date string
      forecastDate.setHours(0, 0, 0, 0);

      /**
       * DATE COMPARISON: Calculate day offset from today
       * 0 = today, 1 = tomorrow, 2+ = future days
       * Used for "Today" / "Tomorrow" labels
       */
      const dayDiff = Math.floor((forecastDate - today) / (1000 * 60 * 60 * 24));

      /**
       * DAY NAME LOGIC: Conditional rendering of day label
       * Priority: Today > Tomorrow > Day of Week
       */
      let dayName;
      if (dayDiff === 0) {
        dayName = "Today";
      } else if (dayDiff === 1) {
        dayName = "Tomorrow";
      } else {
        // FORMAT: Get day of week (e.g., "Monday")
        dayName = forecastDate.toLocaleDateString("en-US", { weekday: "long" });
      }

      /**
       * DATE FORMATTING: Short format (e.g., "Jan 5")
       * toLocaleDateString with custom options
       */
      const formattedDate = forecastDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
      });

      /**
       * TIME PARSING: Extract sunrise/sunset times
       * API returns ISO timestamps: "2026-01-04T07:15"
       * We extract time portion and format to 12-hour
       */
      const parseSunTime = (isoString) => {
        if (!isoString) return "N/A";
        
        // SPLIT: Separate date and time
        const timePart = isoString.split("T")[1]; // "07:15"
        if (!timePart) return "N/A";

        // PARSE: Extract hours and minutes
        const [hours, minutes] = timePart.split(":").map(Number);
        
        // FORMAT: Convert 24-hour to 12-hour with AM/PM
        const period = hours >= 12 ? "PM" : "AM";
        const displayHours = hours % 12 || 12; // 0 becomes 12
        
        return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
      };

      /**
       * RETURN OBJECT: Structured data for DailyForecastCard
       * Each property corresponds to a card prop
       */
      return {
        date: dateStr,                                    // ISO date for key
        day: dayName,                                      // "Today", "Monday", etc.
        formattedDate,                                     // "Jan 5"
        weatherCode: daily.weather_code[i],                // WMO code (0-99)
        maxTemp: daily.temperature_2m_max[i],              // High temp
        minTemp: daily.temperature_2m_min[i],              // Low temp
        precipitationProb: daily.precipitation_probability_max[i] || 0, // % chance
        sunrise: parseSunTime(daily.sunrise[i]),           // "7:15 AM"
        sunset: parseSunTime(daily.sunset[i]),             // "5:30 PM"
        isToday: dayDiff === 0                             // Highlight flag
      };
    });
  }, [weatherData]); // DEPENDENCY: Recalculate only when weatherData changes

  /**
   * UNIT FORMATTING: Temperature symbol
   * Extracted from store units setting
   */
  const tempUnit = units.temperature_unit === "celsius" ? "°C" : "°F";

  /**
   * GUARD CLAUSE: Loading State
   * Shows spinner while fetching data
   */
  if (isFetching) {
    return (
      <section className="p-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
          7-Day Forecast
        </h2>
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 dark:text-gray-400 text-lg">Loading forecast...</p>
          </div>
        </div>
      </section>
    );
  }

  /**
   * GUARD CLAUSE: Error State
   * Displays error message with icon
   */
  if (isError) {
    return (
      <section className="p-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
          7-Day Forecast
        </h2>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-8 text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <div className="text-red-600 dark:text-red-400 text-lg font-semibold mb-2">
            Unable to load forecast
          </div>
          <p className="text-red-500 dark:text-red-300">
            {errorMessage || "Please try again later"}
          </p>
        </div>
      </section>
    );
  }

  /**
   * GUARD CLAUSE: No Data State
   * Shows when user hasn't searched yet
   */
  if (!weatherData || !location || forecastDays.length === 0) {
    return (
      <section className="p-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
          7-Day Forecast
        </h2>
        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-12 text-center">
          <div className="text-6xl mb-4">📅</div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Search for a location to view the 7-day forecast
          </p>
        </div>
      </section>
    );
  }

  /**
   * MAIN RENDER: Forecast Grid
   * Responsive layout:
   * - Mobile: 1 column
   * - Tablet: 2 columns
   * - Desktop: 3-4 columns
   * - Wide: 7 columns (one per day)
   */
  return (
    <section className="p-6 max-w-7xl mx-auto animate-slideUp">
      {/* SECTION HEADER */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          7-Day Forecast
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Extended weather outlook for {location.name}, {location.country}
        </p>
      </div>

      {/* FORECAST CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-6">
        {forecastDays.map((day) => (
          <DailyForecastCard
            key={day.date}               // UNIQUE KEY: ISO date string
            day={day.day}                // "Today", "Monday"
            date={day.formattedDate}     // "Jan 5"
            weatherCode={day.weatherCode} // WMO code
            maxTemp={day.maxTemp}        // High temp number
            minTemp={day.minTemp}        // Low temp number
            tempUnit={tempUnit}          // "°C" or "°F"
            precipitationProb={day.precipitationProb} // % chance
            sunrise={day.sunrise}        // "7:15 AM"
            sunset={day.sunset}          // "5:30 PM"
            isToday={day.isToday}        // Highlight flag
          />
        ))}
      </div>

      {/* INFO FOOTER */}
      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div className="flex items-start gap-3">
          <span className="text-2xl">ℹ️</span>
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mb-1">
              Forecast Information
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Weather data is updated hourly. Precipitation probability represents the chance of any measurable precipitation during the day. 
              Sunrise and sunset times are calculated for the location's timezone.
            </p>
          </div>
        </div>
      </div>

      {/* CSS for Custom Animations */}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideUp {
          animation: slideUp 0.6s ease-out;
        }
      `}</style>
    </section>
  );
};

export default DailyForecast;
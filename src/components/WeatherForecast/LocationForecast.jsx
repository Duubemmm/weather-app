import { getWeatherIcon, getWeatherDescription } from "../../utils/WeatherIcons";
import useWeatherStore from "../../store/WeatherStore";

/**
 * LocationForecast Component
 * 
 * PURPOSE: Displays current weather conditions and key metrics for the selected location
 * 
 * FEATURES:
 * - Current temperature with animated weather icon
 * - Location details (city, country, timezone)
 * - Weather description (e.g., "Clear skies")
 * - Real-time metrics grid: feels like, humidity, wind, precipitation
 * - Responsive layout adapts to mobile/tablet/desktop
 * - Loading and error states
 * 
 * DATA FLOW:
 * 1. Subscribes to weatherStore for current weather data
 * 2. Extracts current conditions from weatherData.current
 * 3. Maps weather code to icon and description
 * 4. Formats data with appropriate units
 * 
 * COMPONENT STRUCTURE:
 * - Hero section: Large temp + icon + location
 * - Metrics grid: 4 key weather metrics in cards
 */

const LocationForecast = () => {
  // STORE SUBSCRIPTION: Extract weather data and loading states
  const { weatherData, location, isFetching, isError, errorMessage, units } = useWeatherStore();

  /**
   * GUARD CLAUSE: Loading State
   * Shows spinner while fetching weather data
   * Prevents rendering with null data
   */
  if (isFetching) {
    return (
      <section className="p-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-center h-96">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 dark:text-gray-400 text-lg">Loading weather data...</p>
          </div>
        </div>
      </section>
    );
  }

  /**
   * GUARD CLAUSE: Error State
   * Displays error message with retry option
   * Shows when API calls fail
   */
  if (isError) {
    return (
      <section className="p-6 max-w-7xl mx-auto">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
          <div className="text-red-600 dark:text-red-400 text-lg font-semibold mb-2">
            Unable to load weather data
          </div>
          <p className="text-red-500 dark:text-red-300">{errorMessage || "Please try again later"}</p>
        </div>
      </section>
    );
  }

  /**
   * GUARD CLAUSE: No Data State
   * Shows when user hasn't searched for a location yet
   * Provides helpful instructions
   */
  if (!weatherData || !location) {
    return (
      <section className="p-6 max-w-7xl mx-auto">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-12 text-center">
          <div className="text-6xl mb-4">🌍</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            Welcome to Weather App
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Search for a location above to view current weather conditions
          </p>
        </div>
      </section>
    );
  }

  /**
   * DATA EXTRACTION: Current Weather Conditions
   * weatherData.current contains real-time measurements from Open-Meteo API
   * All values are in the units specified in the store (metric/imperial)
   */
  const current = weatherData.current;

  /**
   * ICON MAPPING: Convert weather code to icon name
   * Open-Meteo returns WMO weather codes (0-99)
   * getWeatherIcon() maps to simplified categories: sunny, rain, snow, etc.
   */
  const iconName = getWeatherIcon(current.weather_code);

  /**
   * DESCRIPTION MAPPING: Convert weather code to human-readable text
   * Examples: "Clear skies", "Moderate rain", "Heavy snow"
   */
  const description = getWeatherDescription(current.weather_code);

  /**
   * UNIT FORMATTING: Create display strings with appropriate symbols
   * Dynamically adjusts based on user's unit preference
   */
  const tempUnit = units.temperature_unit === "celsius" ? "°C" : "°F";
  const windUnit = units.wind_speed_unit === "kmh" ? "km/h" : "mph";
  const precipUnit = units.precipitation_unit === "mm" ? "mm" : "in";

  /**
   * TIME FORMATTING: Format timezone for display
   * Example: "America/New_York" → "America/New York"
   * Replaces underscores with spaces for readability
   */
  const formattedTimezone = location.timezone?.replace(/_/g, " ") || "Local Time";

  /**
   * WEATHER METRICS: Key data points for detailed conditions
   * Each metric includes value, unit, icon, and label
   * Organized in a grid for easy scanning
   */
  const metrics = [
    {
      label: "Feels Like",
      value: Math.round(current.apparent_temperature),
      unit: tempUnit,
      icon: "🌡️",
      description: "Perceived temperature accounting for wind and humidity"
    },
    {
      label: "Humidity",
      value: current.relative_humidity_2m,
      unit: "%",
      icon: "💧",
      description: "Relative humidity at 2 meters above ground"
    },
    {
      label: "Wind Speed",
      value: Math.round(current.wind_speed_10m),
      unit: windUnit,
      icon: "💨",
      description: "Wind speed at 10 meters above ground"
    },
    {
      label: "Precipitation",
      value: current.precipitation?.toFixed(1) || 0,
      unit: precipUnit,
      icon: "🌧️",
      description: "Current precipitation amount"
    }
  ];

  /**
   * ADDITIONAL METRICS: Extended weather information
   * UV Index, Visibility, Pressure, Cloud Cover
   * Displayed in secondary section for power users
   */
  const additionalMetrics = [
    {
      label: "UV Index",
      value: current.uv_index?.toFixed(1) || "N/A",
      unit: "",
      icon: "☀️",
      description: "Ultraviolet radiation level (0-11+)"
    },
    {
      label: "Visibility",
      value: current.visibility ? (current.visibility / 1000).toFixed(1) : "N/A",
      unit: "km",
      icon: "👁️",
      description: "Horizontal visibility distance"
    },
    {
      label: "Pressure",
      value: current.surface_pressure?.toFixed(0) || "N/A",
      unit: "hPa",
      icon: "🔽",
      description: "Atmospheric pressure at surface level"
    },
    {
      label: "Cloud Cover",
      value: current.cloud_cover || 0,
      unit: "%",
      icon: "☁️",
      description: "Percentage of sky covered by clouds"
    }
  ];

  return (
    <section className="p-6 max-w-7xl mx-auto animate-fadeIn">
      {/* 
        HERO SECTION: Main Weather Display
        - Large temperature reading
        - Animated weather icon
        - Location details
        - Weather description
      */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-900 dark:to-blue-950 rounded-2xl shadow-2xl p-8 md:p-12 mb-6 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* LEFT: Temperature & Icon */}
          <div className="flex items-center gap-6">
            {/* Weather Icon with Animation */}
            <div className="relative">
              <div className="text-8xl md:text-9xl animate-bounce-slow">
                {iconName === "sunny" && "☀️"}
                {iconName === "partly-cloudy" && "⛅"}
                {iconName === "overcast" && "☁️"}
                {iconName === "fog" && "🌫️"}
                {iconName === "drizzle" && "🌦️"}
                {iconName === "rain" && "🌧️"}
                {iconName === "snow" && "❄️"}
                {iconName === "storm" && "⛈️"}
              </div>
              {/* Day/Night Indicator */}
              <div className="absolute -bottom-2 -right-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold">
                {current.is_day ? "Day" : "Night"}
              </div>
            </div>

            {/* Temperature Display */}
            <div>
              <div className="text-7xl md:text-8xl font-bold tracking-tight">
                {Math.round(current.temperature_2m)}
                <span className="text-4xl md:text-5xl">{tempUnit}</span>
              </div>
              <div className="text-xl md:text-2xl font-medium mt-2 opacity-90">
                {description}
              </div>
            </div>
          </div>

          {/* RIGHT: Location Details */}
          <div className="text-center md:text-right">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {location.name}
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              {location.state && `${location.state}, `}
              {location.country}
            </p>
            <div className="mt-3 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="text-lg">🌐</span>
              <span className="text-sm font-medium">{formattedTimezone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 
        PRIMARY METRICS GRID: Key Weather Conditions
        - 4-column grid on desktop
        - 2-column on tablet
        - 1-column on mobile
        - Hover effects for interactivity
      */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Current Conditions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-gray-100 dark:border-gray-700 group"
              title={metric.description}
            >
              {/* Icon with Hover Animation */}
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {metric.icon}
              </div>
              
              {/* Metric Label */}
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                {metric.label}
              </div>
              
              {/* Metric Value */}
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {metric.value}
                <span className="text-xl text-gray-600 dark:text-gray-400 ml-1">
                  {metric.unit}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 
        ADDITIONAL METRICS SECTION: Extended Information
        - UV Index, Visibility, Pressure, Cloud Cover
        - Collapsible/expandable for advanced users
        - Same grid layout as primary metrics
      */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <span>Additional Details</span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            (Hover for info)
          </span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {additionalMetrics.map((metric, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-md p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-200 dark:border-gray-700 group cursor-help"
              title={metric.description}
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {metric.icon}
              </div>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                {metric.label}
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {metric.value}
                {metric.unit && (
                  <span className="text-lg text-gray-600 dark:text-gray-400 ml-1">
                    {metric.unit}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS for Custom Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default LocationForecast;
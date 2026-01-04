/**
 * DailyForecastCard Component
 * 
 * PURPOSE: Displays a single day's forecast in a card format
 * 
 * PROPS:
 * @param {string} day - Day of the week (e.g., "Monday", "Today", "Tomorrow")
 * @param {string} date - Formatted date (e.g., "Jan 5")
 * @param {number} weatherCode - WMO weather code (0-99)
 * @param {number} maxTemp - High temperature for the day
 * @param {number} minTemp - Low temperature for the day
 * @param {string} tempUnit - Temperature unit ("°C" or "°F")
 * @param {number} precipitationProb - Chance of precipitation (0-100%)
 * @param {string} sunrise - Sunrise time (e.g., "6:45 AM")
 * @param {string} sunset - Sunset time (e.g., "5:30 PM")
 * @param {boolean} isToday - Whether this is today's forecast (highlights card)
 * 
 * FEATURES:
 * - Responsive card design with hover effects
 * - Weather icon with animation
 * - Temperature range with visual bar
 * - Precipitation probability
 * - Sunrise/sunset times
 * - "Today" highlight for current day
 * 
 * DESIGN PATTERNS:
 * - Presentational component (no business logic)
 * - Props-driven rendering
 * - Tailwind for responsive styling
 * - Accessibility attributes
 */

const DailyForecastCard = ({
  day,
  date,
  weatherCode,
  maxTemp,
  minTemp,
  tempUnit,
  precipitationProb,
  sunrise,
  sunset,
  isToday = false
}) => {
  /**
   * ICON SELECTION: Map weather code to emoji
   * Simplified icons for quick visual recognition
   * Matches the icon mapping in weatherIcons.js
   */
  const getIconEmoji = (code) => {
    if (code === 0) return "☀️";
    if (code <= 3) return "⛅";
    if (code <= 48) return "🌫️";
    if (code <= 57) return "🌦️";
    if (code <= 67) return "🌧️";
    if (code <= 77) return "❄️";
    if (code <= 82) return "🌧️";
    if (code <= 86) return "❄️";
    return "⛈️";
  };

  const icon = getIconEmoji(weatherCode);

  /**
   * TEMPERATURE RANGE CALCULATION
   * Creates visual representation of temp range
   * Bar width = proportion of high temp to low temp
   */
  const tempRange = maxTemp - minTemp;
  const tempRangePercent = tempRange > 0 ? ((maxTemp - minTemp) / maxTemp) * 100 : 50;

  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 
        hover:shadow-2xl hover:scale-105 cursor-pointer
        ${isToday 
          ? 'bg-gradient-to-br from-blue-600 to-blue-800 text-white ring-4 ring-blue-400 dark:ring-blue-500' 
          : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750'
        }
      `}
      role="article"
      aria-label={`Weather forecast for ${day}`}
    >
      {/* TODAY BADGE */}
      {isToday && (
        <div className="absolute top-3 right-3 bg-yellow-400 text-blue-900 text-xs font-bold px-3 py-1 rounded-full shadow-md animate-pulse">
          TODAY
        </div>
      )}

      <div className="p-6">
        {/* HEADER: Day and Date */}
        <div className="mb-4">
          <h3 className={`text-xl font-bold ${isToday ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
            {day}
          </h3>
          <p className={`text-sm ${isToday ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
            {date}
          </p>
        </div>

        {/* WEATHER ICON */}
        <div className="flex justify-center my-6">
          <div className="text-7xl animate-float">
            {icon}
          </div>
        </div>

        {/* TEMPERATURE RANGE */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            {/* High Temperature */}
            <div className="flex items-center gap-2">
              <span className={`text-3xl font-bold ${isToday ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                {Math.round(maxTemp)}°
              </span>
              <span className={`text-sm ${isToday ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
                High
              </span>
            </div>

            {/* Low Temperature */}
            <div className="flex items-center gap-2">
              <span className={`text-sm ${isToday ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
                Low
              </span>
              <span className={`text-2xl font-semibold ${isToday ? 'text-blue-200' : 'text-gray-600 dark:text-gray-300'}`}>
                {Math.round(minTemp)}°
              </span>
            </div>
          </div>

          {/* Temperature Range Bar */}
          <div className={`h-2 rounded-full overflow-hidden ${isToday ? 'bg-blue-400' : 'bg-gray-200 dark:bg-gray-700'}`}>
            <div
              className={`h-full rounded-full ${isToday ? 'bg-yellow-300' : 'bg-gradient-to-r from-blue-400 to-red-400'}`}
              style={{ width: `${tempRangePercent}%` }}
            ></div>
          </div>
        </div>

        {/* PRECIPITATION PROBABILITY */}
        {precipitationProb > 0 && (
          <div className={`flex items-center justify-between p-3 rounded-lg mb-4 ${
            isToday ? 'bg-blue-500/50' : 'bg-blue-50 dark:bg-blue-900/20'
          }`}>
            <div className="flex items-center gap-2">
              <span className="text-2xl">💧</span>
              <span className={`text-sm font-medium ${isToday ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                Precipitation
              </span>
            </div>
            <span className={`text-lg font-bold ${isToday ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`}>
              {precipitationProb}%
            </span>
          </div>
        )}

        {/* SUNRISE & SUNSET */}
        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          {/* Sunrise */}
          <div className="flex flex-col items-center">
            <span className="text-2xl mb-1">🌅</span>
            <span className={`text-xs ${isToday ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
              Sunrise
            </span>
            <span className={`text-sm font-semibold ${isToday ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
              {sunrise}
            </span>
          </div>

          {/* Sunset */}
          <div className="flex flex-col items-center">
            <span className="text-2xl mb-1">🌇</span>
            <span className={`text-xs ${isToday ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
              Sunset
            </span>
            <span className={`text-sm font-semibold ${isToday ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
              {sunset}
            </span>
          </div>
        </div>
      </div>

      {/* HOVER EFFECT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-transparent to-transparent opacity-0 hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>

      {/* CSS for Custom Animations */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default DailyForecastCard;
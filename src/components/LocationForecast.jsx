import SunIcon from "/icon-sunny.webp";
import useWeatherStore from "../store/WeatherStore";

const LocationForecast = () => {
  const { 
    weatherData,
    location,
    isFetching,
    isError,
    errorMessage,
  } = useWeatherStore();

  const formatDate = () => {
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    return new Date().toLocaleDateString('en-US', options);
  };

  if (isFetching) {
    return (
      <section className="max-w-3xl mx-auto bg-[url(/bg-today-small.svg)]">
        <div className="text-white text-center py-20">
          Loading weather data...
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="max-w-3xl mx-auto">
        <div className="text-white text-center py-20 bg-red-500/20 rounded-lg p-6">
          <p className="text-xl font-semibold">Error</p>
          <p className="mt-2">{errorMessage}</p>
        </div>
      </section>
    );
  }

  if (!weatherData || !location) {
    return (
      <section className="max-w-3xl mx-auto">
        <div className="text-white text-center py-20">
          Search for a location to see weather data
        </div>
      </section>
    );
  }

  const temperature = Math.round(weatherData.current.temperature_2m);
  const feelsLike = Math.round(weatherData.current.apparent_temperature);
  const humidity = weatherData.current.relative_humidity_2m;
  const windSpeed = weatherData.current.wind_speed_10m;
  const precipitation = weatherData.current.precipitation;

  const WeatherMetrics = [
    { Metric: "Feels like", Value: `${feelsLike}°` },
    { Metric: "Humidity", Value: `${humidity}%` },
    { Metric: "Wind", Value: `${windSpeed}km/h` },
    { Metric: "Precipitation", Value: `${precipitation}mm` },
  ];

  return (
    <section className="max-w-3xl mx-auto">
      <div className="text-white bg-[url(/bg-today-small.svg)] bg-cover bg-center bg-no-repeat px-6 py-20 md:flex-row md:bg-[url(/bg-today-large.svg)] p-6 flex flex-col items-center justify-center text-center sm:items-start sm:text-left">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          {location.name}, {location.country}
        </h1>
        <p className="text-blue-200 mt-1">{formatDate()}</p>

        <div className="flex items-center gap-4 mt-4">
          <img
            src={SunIcon}
            alt="Sunny weather icon"
            className="w-20 h-20 md:w-24 md:h-24"
          />
          <span className="text-5xl md:text-6xl font-light">
            {temperature}°
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 text-center">
        {WeatherMetrics.map((metric, idx) => (
          <div key={idx} className="p-4 rounded-lg bg-white/10 text-white">
            <p className="text-sm text-blue-200">{metric.Metric}</p>
            <p className="text-lg font-semibold">{metric.Value}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LocationForecast;

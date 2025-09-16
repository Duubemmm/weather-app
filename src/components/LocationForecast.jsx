import SunIcon from "/icon-sunny.webp";

const LocationForecast = () => {
  const location = "Berlin, Germany";
  const date = "Tuesday, 16th September";
  const temperature = 20;

  const WeatherMetrics = [
    { Metric: "Feels like", Value: 18 },
    { Metric: "Humidity", Value: 46 },
    { Metric: "Wind", Value: "14km/h" },
    { Metric: "Precipitation", Value: "0mm" },
  ];

  return (
    <section className="max-w-3xl mx-auto">
      <div className="text-white background p-6 flex flex-col items-center justify-center text-center sm:items-start sm:text-left">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          {location}
        </h1>
        <p className="text-blue-200 mt-1">{date}</p>

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

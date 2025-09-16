import Sunny from "/icon-sunny.webp";
import Snow from "/icon-snow.webp";
import Storm from "/icon-storm.webp";
import Fog from "/icon-fog.webp";
import Drizzle from "/icon-drizzle.webp";
import Overcast from "/icon-overcast.webp";
import PartlyCloudy from "/icon-partly-cloudy.webp";

const DailyForecast = () => {
  const DailyMetrics = [
    { id: 1, Day: "Mon", Image: Sunny, Value: { FirstValue: 20, SecondValue: 10 } },
    { id: 2, Day: "Tue", Image: Snow, Value: { FirstValue: 18, SecondValue: 6 } },
    { id: 3, Day: "Wed", Image: Storm, Value: { FirstValue: 22, SecondValue: 14 } },
    { id: 4, Day: "Thu", Image: Fog, Value: { FirstValue: 17, SecondValue: 9 } },
    { id: 5, Day: "Fri", Image: Drizzle, Value: { FirstValue: 19, SecondValue: 11 } },
    { id: 6, Day: "Sat", Image: Overcast, Value: { FirstValue: 21, SecondValue: 13 } },
    { id: 7, Day: "Sun", Image: PartlyCloudy, Value: { FirstValue: 23, SecondValue: 15 } },
  ];

  return (
    <section className="max-w-4xl mx-auto mt-8 px-4">
        <h3 className="text-0">Daily forecast</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
        {DailyMetrics.map((metrics) => (
          <div
            key={metrics.id}
            className="flex flex-col items-center bg-white/10 backdrop-blur-md rounded-2xl p-4 text-white hover:bg-white/20 transition"
          >
            <h4 className="text-lg font-semibold mb-2">{metrics.Day}</h4>
            <img
              src={metrics.Image}
              alt={`${metrics.Day} forecast`}
              className="w-12 h-12 object-contain mb-2"
            />
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold">{metrics.Value.FirstValue}°</span>
              <span className="text-sm text-blue-200">{metrics.Value.SecondValue}°</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DailyForecast;

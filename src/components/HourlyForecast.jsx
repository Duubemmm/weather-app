import { useState } from "react";
import Sunny from "/icon-sunny.webp";
import Snow from "/icon-snow.webp";
import Storm from "/icon-storm.webp";
import Fog from "/icon-fog.webp";
import Drizzle from "/icon-drizzle.webp";
import Overcast from "/icon-overcast.webp";
import PartlyCloudy from "/icon-partly-cloudy.webp";
import IconDropDown from "/icon-dropdown.svg";

const HourlyForecast = () => {
  const [dayDropDown, setDayDropDown] = useState(true);

  const toggleDropDown = () => {
    setDayDropDown(!dayDropDown);
  };

  const HourlyMetrics = [
    { id: 1, Time: "1pm", Image: Sunny, Value: { FirstValue: 20, SecondValue: 10 } },
    { id: 2, Time: "2pm", Image: Snow, Value: { FirstValue: 18, SecondValue: 6 } },
    { id: 3, Time: "3pm", Image: Storm, Value: { FirstValue: 22, SecondValue: 14 } },
    { id: 4, Time: "4pm", Image: Fog, Value: { FirstValue: 17, SecondValue: 9 } },
    { id: 5, Time: "5pm", Image: Drizzle, Value: { FirstValue: 19, SecondValue: 11 } },
    { id: 6, Time: "6pm", Image: Overcast, Value: { FirstValue: 21, SecondValue: 13 } },
    { id: 7, Time: "7pm", Image: PartlyCloudy, Value: { FirstValue: 23, SecondValue: 15 } },
  ];

  return (
    <section className="max-w-4xl mx-auto mt-8 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white">Hourly forecast</h3>
        <button
          onClick={toggleDropDown}
          className="flex items-center gap-2 bg-white/10 text-white px-3 py-2 rounded-lg shadow hover:bg-white/20 transition"
        >
          Tuesday
          <img
            src={IconDropDown}
            alt="Toggle forecast"
            className={`w-5 h-5 transition-transform ${
              dayDropDown ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>

      {/* Forecast list */}
      {dayDropDown && (
        <div className="flex flex-col divide-y divide-white/10 rounded-xl overflow-hidden bg-white/5 backdrop-blur">
          {HourlyMetrics.map((metrics) => (
            <div
              key={metrics.id}
              className="flex items-center justify-between p-4 text-white hover:bg-white/10 transition"
            >
              {/* Left: Time + Icon */}
              <div className="flex items-center gap-4">
                <h4 className="text-base font-medium">{metrics.Time}</h4>
                <img
                  src={metrics.Image}
                  alt={`${metrics.Time} forecast`}
                  className="w-8 h-8 object-contain"
                />
              </div>

              {/* Right: Temps */}
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">{metrics.Value.FirstValue}°</span>
                <span className="text-sm text-blue-200">{metrics.Value.SecondValue}°</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default HourlyForecast;

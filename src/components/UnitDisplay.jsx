import IconUnit from "/icon-units.svg";
import IconDropDown from "/icon-dropdown.svg";
import { useState } from "react";
import useWeatherStore from "../store/WeatherStore";

const UnitDisplay = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  
  const units = useWeatherStore((state) => state.units);
  const setUnits = useWeatherStore((state) => state.setUnits);
  
  const isMetric = units.temperature_unit === "celsius";

  const handleDropDownClick = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const handleToggleToMetric = () => {
    setUnits({
      temperature_unit: "celsius",
      wind_speed_unit: "kmh",
      precipitation_unit: "mm",
    });
    setIsDropDownOpen(false);
  };

  const handleToggleToImperial = () => {
    setUnits({
      temperature_unit: "fahrenheit",
      wind_speed_unit: "mph",
      precipitation_unit: "inch",
    });
    setIsDropDownOpen(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2 text-white bg-700 px-4 py-2 rounded cursor-pointer" onClick={handleDropDownClick}>
        <img src={IconUnit} alt="Unit icon" />
        <span>{isMetric ? "Metric" : "Imperial"}</span>
        <img 
          src={IconDropDown} 
          alt="Dropdown icon"
          className={`transition-transform ${isDropDownOpen ? 'rotate-180' : ''}`}
        />
      </div>

      {isDropDownOpen && (
        <div className="absolute top-full mt-1 bg-white rounded shadow-lg overflow-hidden z-10">
          <button
            onClick={handleToggleToMetric}
            className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${
              isMetric ? "bg-blue-50 font-semibold" : ""
            }`}
          >
            Metric (°C, km/h, mm)
          </button>
          <button
            onClick={handleToggleToImperial}
            className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${
              !isMetric ? "bg-blue-50 font-semibold" : ""
            }`}
          >
            Imperial (°F, mph, in)
          </button>
        </div>
      )}
    </div>
  );
};

export default UnitDisplay;
const convertTemp = (celsius, isMetric) => {
  if (isMetric) return celsius;
  return (celsius * 9/5) + 32; 
};

const convertWindSpeed = (kmh, isMetric) => {
  if (isMetric) return kmh;
  return kmh * 0.621371; 
};

const convertPrecipitation = (mm, isMetric) => {
  if (isMetric) return mm;
  return mm / 25.4; 
};

const convertVisibility = (meters, isMetric) => {
  if (isMetric) return (meters / 1000).toFixed(1); 
  return (meters / 1609.34).toFixed(1); 
};


const getTempUnit = (isMetric) => isMetric ? "°C" : "°F";
const getWindSpeedUnit = (isMetric) => isMetric ? "km/h" : "mph";
const getPrecipitationUnit = (isMetric) => isMetric ? "mm" : "in";
const getVisibilityUnit = (isMetric) => isMetric ? "km" : "mi";

export {
  convertTemp,
  convertWindSpeed,
  convertPrecipitation,
  convertVisibility,
  getTempUnit,
  getWindSpeedUnit,
  getPrecipitationUnit,
  getVisibilityUnit
};
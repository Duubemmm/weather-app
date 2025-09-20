const BASE_GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const BASE_WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

// helper to fetch with error handling
const fetchJSON = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
  return res.json();
};

// 1. Get coordinates by city name
export const fetchCoordinates = async (city) => {
  const url = `${BASE_GEO_URL}?name=${encodeURIComponent(city)}&count=1`;
  const data = await fetchJSON(url);

  if (!data.results || data.results.length === 0) {
    throw new Error("City not found");
  }

  return data.results[0]; // { latitude, longitude, name, country }
};

// 2. Get weather by coordinates
export const fetchWeather = async (latitude, longitude) => {
  const url = `${BASE_WEATHER_URL}?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`;
  return fetchJSON(url);
};

// 3. Main function: get weather by city name
export const fetchWeatherForCity = async (city) => {
  const { latitude, longitude, name, country } = await fetchCoordinates(city);
  const forecast = await fetchWeather(latitude, longitude);

  return {
    location: { name, country, latitude, longitude },
    forecast,
  };
};

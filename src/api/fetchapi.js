export async function searchLocation(locationName) {
  const SEARCHLOCATION_URL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(locationName)}&count=5&language=en&format=json`;

  const response = await fetch(SEARCHLOCATION_URL);

  if (!response.ok) {
    throw new Error(`Location search failed: ${response.status}`);
  }

  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error(`No results found for "${locationName}"`);
  }

  return data.results.map(location => ({
    name: location.name,
    latitude: location.latitude,
    longitude: location.longitude,
    city: location.name,
    country: location.country || "",
    state: location.admin1 || "",
    timezone: location.timezone || "",
  }));
}

export async function getLocationDetails(latitude, longitude) {
  const NOMINATIM_URL = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1&accept-language=en`;

  const response = await fetch(NOMINATIM_URL, {
    headers: {
      'User-Agent': 'WeatherApp/1.0' 
    }
  });

  if (!response.ok) {
    throw new Error(`Reverse geocoding failed: ${response.status}`);
  }

  const responseData = await response.json();

  if (!responseData.address) {
    throw new Error(`Location details not found for coordinates.`);
  }

  const address = responseData.address;

  const city =
    address.city ||
    address.town ||
    address.village ||
    address.county || ""
    // responseData.display_name.split(",")[0].trim();

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return {
    name: city,
    country: address.country || "",
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
    state: address.state || address.province || "",
    timezone: timezone,
  };
}

export async function getWeather(latitude, longitude, units = {}) {
  const params = new URLSearchParams({
    latitude,
    longitude,
    daily: "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max",
    hourly: "weather_code,temperature_2m,precipitation,apparent_temperature,wind_speed_10m,relative_humidity_2m",
    current: "temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,precipitation,wind_speed_10m,uv_index,visibility,surface_pressure,cloud_cover,is_day",
    timezone: "auto", 
    ...units,
  });

  const WEATHER_URL = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
  const response = await fetch(WEATHER_URL);

  if (!response.ok) {
    throw new Error(`Weather fetch failed: ${response.status}`);
  }

  return await response.json();
}
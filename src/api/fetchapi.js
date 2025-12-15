export async function searchLocation(locationName) {
 
  const SEARCHLOCATION_URL = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationName)}&format=json&limit=5&addressdetails=1`;

  const response = await fetch(SEARCHLOCATION_URL);

  if (!response.ok) {
    throw new Error(`Location search failed: ${response.status}`);
  }

  const locationData = await response.json();

  if (!locationData || locationData.length === 0) {
    throw new Error(`No results found for "${locationName}"`);
  }

  // Return multiple results so user can choose if needed
  return locationData.map(location => ({
    name: location.display_name,
    latitude: parseFloat(location.lat),
    longitude: parseFloat(location.lon),
    city: location.address?.city || location.address?.town || location.address?.village || "",
    country: location.address?.country || "",
    state: location.address?.state || "",
  }));
}

// 2. REVERSE GEOCODING: Coordinates → location details (for geolocation)
export async function getLocationDetails(latitude, longitude) {
  const NOMINATIM_URL = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1&accept-language=en`;

  const response = await fetch(NOMINATIM_URL);

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
    address.county ||
    responseData.display_name.split(",")[0].trim();

  return {
    name: city,
    country: address.country || "",
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
    state: address.state || address.province || "",
  };
}

export async function getWeather(latitude, longitude, units = {}) {
  const params = new URLSearchParams({
    latitude,
    longitude,
    daily: "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max",
    hourly: "weather_code,temperature_2m,precipitation,apparent_temperature,wind_speed_10m,relative_humidity_2m",
    current: "temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,precipitation,wind_speed_10m,uv_index,visibility,surface_pressure,cloud_cover,is_day",
    ...units,
  });

  const WEATHER_URL = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
  const response = await fetch(WEATHER_URL);

  if (!response.ok) {
    throw new Error(`Weather fetch failed: ${response.status}`);
  }

  return await response.json();
}

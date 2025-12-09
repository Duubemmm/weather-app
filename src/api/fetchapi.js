export async function getCoordinates(locationName){
  const GEOCODING_URL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(locationName)}&count=1&language=en&format=json`;
  const response = await fetch(GEOCODING_URL);
if (!response.ok) {
      throw new Error(`Geocoding failed: ${response.status}`);
    }
  const responseData = await response.json()
    if (!responseData.results || responseData.results.length === 0) {
      throw new Error(`Location not found for: ${locationName}`);
  }
  const locationData = responseData.results[0]
       return {
       name: locationData.name,
       country: locationData.country,
       latitude: locationData.latitude,
       longitude: locationData.longitude,
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
  
  const responseData = await response.json();
  return responseData;
}

export async function getWeatherByLocation(locationName) {
    const coords = await getCoordinates(locationName);
    
    if (!coords) {
      return null;
    }
    
    const weather = await getWeather(coords.latitude, coords.longitude);
    
    return { 
      coords, 
      weather 
    };
}
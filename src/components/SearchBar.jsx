import SearchIcon from "/icon-search.svg";
import { useState } from "react";
import useWeatherStore from "../store/WeatherStore";
import useGeolocation from "../hooks/UseGeolocation";

const SearchBar = () => {
  const { isFetching, fetchWeatherByName } = useWeatherStore();
  const { getCurrentLocation } = useGeolocation();
  const [inputValue, setInputValue] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      await fetchWeatherByName(inputValue.trim());
      setInputValue(""); // Clear input after search
    }
  };

  const handleUseMyLocation = () => {
    getCurrentLocation();
  };

  return (
    <section className="p-4">
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row w-full max-w-3xl mx-auto items-center gap-2"
      >
        <div className="flex flex-grow items-center gap-3 bg-600 p-3 rounded-lg shadow-sm w-full">
          <img
            src={SearchIcon}
            alt="Search Icon"
            className="w-5 h-5 flex-shrink-0"
          />
          <input
            id="search"
            name="search"
            type="search"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search for a place..."
            aria-label="Search for a place"
            className="w-full bg-transparent text-0"
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <button
            type="submit"
            disabled={isFetching || !inputValue.trim()}
            className="flex-1 sm:flex-none bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isFetching ? "Searching..." : "Search"}
          </button>

          <button
            type="button"
            onClick={handleUseMyLocation}
            disabled={isFetching}
            className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-3 rounded-lg font-semibold shadow-sm hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Use my current location"
          >
            <span className="hidden sm:inline">My Location</span>
            <span className="sm:hidden">📍</span>
          </button>
        </div>
      </form>
    </section>
  );
};

export default SearchBar;
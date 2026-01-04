import SearchIcon from "/icon-search.svg";
import { MdMyLocation } from "react-icons/md";
import { useState, useRef, useEffect } from "react";
import useWeatherStore from "../store/WeatherStore";
import useGeolocation from "../hooks/UseGeolocation";

const SearchBar = () => {
  const { 
    isFetching, 
    searchResults, 
    searchLocations, 
    fetchWeatherForLocation,
    clearSearchResults 
  } = useWeatherStore();
  
  const { getCurrentLocation } = useGeolocation();
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim().length > 2) {
      await searchLocations(value.trim());
      setShowDropdown(true);
    } else {
      clearSearchResults();
      setShowDropdown(false);
    }
  };

  const handleSelectLocation = async (location) => {
    await fetchWeatherForLocation(location);
    setInputValue("");
    setShowDropdown(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (inputValue.trim() && searchResults.length > 0) {
      await handleSelectLocation(searchResults[0]);
    }
  };

  const handleUseMyLocation = () => {
    getCurrentLocation();
    setInputValue("");
    setShowDropdown(false);
  };

  return (
    <section className="p-4">
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row w-full max-w-3xl mx-auto items-center gap-2"
      >
        <div className="relative flex-grow w-full" ref={dropdownRef}>
          <div className="flex items-center gap-3 bg-600 p-3 rounded-lg shadow-sm w-full">
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
              onChange={handleInputChange}
              placeholder="Search for a place..."
              aria-label="Search for a place"
              className="w-full bg-transparent text-0"
              autoComplete="off"
            />
          </div>

          {/* Search Results Dropdown */}
          {showDropdown && searchResults.length > 0 && (
            <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-64 overflow-y-auto">
              {searchResults.map((location, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSelectLocation(location)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                >
                  <div className="font-medium text-gray-900 dark:text-white">
                    {location.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {location.state && `${location.state}, `}
                    {location.country}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* No results message */}
          {showDropdown && searchResults.length === 0 && inputValue.trim().length > 2 && !isFetching && (
            <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 px-4 py-3">
              <p className="text-gray-600 dark:text-gray-400">No locations found</p>
            </div>
          )}
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <button
            type="submit"
            disabled={isFetching || !inputValue.trim()}
            className="flex-1 sm:flex-none bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
            <MdMyLocation />
          </button>
        </div>
      </form>
    </section>
  );
};

export default SearchBar;
import SearchIcon from "/icon-search.svg";
import { useState } from "react"
import useWeatherStore from "../store/WeatherStore";

const SearchBar = () => {
  const { isFetching, fetchWeather } = useWeatherStore();
  const [inputValue, setInputValue] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault(); 
    if (inputValue.trim()) {
      await fetchWeather(inputValue.trim());
    }
  };

  return (
    <section className="p-4">
      <form
        onSubmit={handleSearch}
        className="flex w-full max-w-3xl mx-auto items-center gap-2"
      >
        <div className="flex flex-grow items-center gap-3 bg-600 p-3 rounded-lg shadow-sm">
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

        <button
          type="submit"
          disabled={isFetching || !inputValue.trim()}
          className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isFetching ? "Searching..." : "Search For Location"}
        </button>
      </form>
    </section>
  );
};

export default SearchBar;
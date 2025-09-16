import { useState, useEffect, useRef } from "react";
import IconUnit from "/icon-units.svg";
import IconDropDown from "/icon-dropdown.svg";
import WeatherLogo from "/logo.svg";

const Header = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const dropdownRef = useRef(null); 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropDownOpen(false);
      }
    };
    if (isDropDownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropDownOpen]);

  return (
    <header className="p-4">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        <a href="/" aria-label="Weather App Home">
          <img src={WeatherLogo} alt="Weather App Logo" className="w-45 h-auto" />
        </a>

        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setIsDropDownOpen(prev => !prev)}
            type="button"
            aria-haspopup="true"
            aria-expanded={isDropDownOpen}
            className="flex items-center gap-2 p-2 bg-[#3d3b5eff] text-white rounded-md hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <img src={IconUnit} alt="" className="w-5 h-5" aria-hidden="true" />
            <span className="inline font-display">Units</span>
            <img
              src={IconDropDown}
              alt="Toggle dropdown"
              className={`w-5 h-5 transition-transform duration-200 ${isDropDownOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {isDropDownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
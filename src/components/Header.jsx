import WeatherLogo from "/logo.svg";
// import UnitDisplay from "./UnitDisplay.jsx"

const Header = () => {
  return (
    <header className="p-4">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        <a href="/" aria-label="Weather App Home">
          <img src={WeatherLogo} alt="Weather App Logo" className="w-45 h-auto" />
        </a>
        {/* <UnitDisplay/> */}
      </nav>
    </header>
  );
};

export default Header;
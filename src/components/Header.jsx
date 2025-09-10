import WeatherLogo from "/logo.svg"
import UnitsDropDown from "./UnitsDropDown";
const Header = () => {
    return (
        <section className="bg-blue-950 p-4 ">
            <div className="flex justify-between">
            <img src={WeatherLogo} className="w-50 h-auto"/>
            <UnitsDropDown />
            </div>

        </section>
    )
}
export default Header;
import LocationForecast from "../components/WeatherForecast/LocationForecast";
import DailyForecast from "../components/WeatherForecast/DailyForecast"
// import HourlyForecast from "../components/HourlyForecast"

const ForeCast = () => {
    return(
        <section className="flex flex-col">
          <LocationForecast/>
          <DailyForecast/>
          {/* <HourlyForecast/> */}
        </section>
    )

}
export default ForeCast;
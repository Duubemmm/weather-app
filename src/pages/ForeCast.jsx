import LocationForecast from "../components/LocationForecast";
import DailyForecast from "../components/DailyForecast"
import HourlyForecast from "../components/HourlyForecast"

const ForeCast = () => {
    return(
        <section className="flex flex-col">
          <LocationForecast/>
          <DailyForecast/>
          <HourlyForecast/>
        </section>
    )

}
export default ForeCast;
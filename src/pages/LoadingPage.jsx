import WeatherLogo from "/logo.svg";
const Loading = () => {
return (
    <section>
        <div>
            <div className="text-white text-center py-20">
          Loading weather data...
        </div>
            <img src={WeatherLogo}/>
        </div>
    </section>
)
}
export default Loading;
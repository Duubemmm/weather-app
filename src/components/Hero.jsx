import SearchBar from "./SearchBar"
import ForeCast from "../pages/ForeCast";
const Hero = () => {
    return (
        <section>
        <h1 className="text-white text-center text-2xl mb-4.5">How's the sky looking today</h1>
       <SearchBar/>
       <ForeCast/>
        </section>
    )

}
export default Hero;
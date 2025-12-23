import ErrorImg from "icon-error.svg"
import RetryImg from "icon-retry.svg"
import Header from "../components/Header"
const Error = () => {
return (
    <section>
        <Header/>
        <img src={ErrorImg}/>
        <h1>Something went wrong</h1>
        <p>We couldn't connect to the server(API error). Please try again in a few moments</p>
        <div>
            <img src={RetryImg}/>
        <button>Retry</button>
        </div>
    </section>
)
}
export default Error;
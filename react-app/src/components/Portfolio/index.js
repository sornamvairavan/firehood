import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom";
import Watchlist from "../Watchlist"
import { getUserPortfolios } from "../../store/portfolio";


export default function Portfolio() {
    const dispatch = useDispatch()

    const [isLoaded, setIsLoaded] = useState(false);
    const userPortfoliosObj = useSelector(state => state.portfolio.portfolios)
    const userPortfoliosArr = Object.values(userPortfoliosObj)

    useEffect(() => {
        dispatch(getUserPortfolios())
            .then(() => setIsLoaded(true)) 
    }, [dispatch, isLoaded])

    return (
        <div className="stocklist-container">
            <div className="portfolio-title-container">
                <span className="watchlist-title">Portfolio</span>
            </div>
            {userPortfoliosArr.length > 0 && (
                userPortfoliosArr.map((portfolio, idx) => (
                    <Link to={`/stocks/${portfolio?.stock?.ticker}`} key={idx} className="stock-card-link">
                        <div className="stock-card">
                            <div>
                                <h4>{portfolio?.stock?.ticker}</h4>
                                <p>{portfolio?.quantity} shares</p>
                            </div>
                            <div>{portfolio?.stock?.price}$price</div>
                        </div>
                    </Link>
                )))}
            <Watchlist />
        </div>
    )
}
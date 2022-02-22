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

    function portfolioValue(userPortfoliosArr){
        let sum = 0;
        userPortfoliosArr.forEach((portfolio) => {
            sum += (portfolio.quantity * portfolio.int_price)
        })
        return sum.toFixed(2)
    }

    return (
        <div className="stocklist-container">
            <div className="portfolio-title-container">
                <span className="watchlist-title">Stocks</span>
                <span>${portfolioValue(userPortfoliosArr)}</span>
            </div>
            {userPortfoliosArr.length > 0 && (
                userPortfoliosArr.map((portfolio, idx) => (
                    <Link to={`/stocks/${portfolio?.stock?.ticker}`} key={idx}>
                        <div className="stock-card">
                            <div>
                                <h4>{portfolio?.stock?.ticker}</h4>
                                <p>{portfolio?.quantity} shares</p>
                            </div>
                            <div className="list-price">{portfolio?.stock?.price}</div>
                        </div>
                    </Link>
                )))}
            <Watchlist />
        </div>
    )
}
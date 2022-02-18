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
        <>
            <h3>Portfolio</h3>
            {userPortfoliosArr.length > 0 && (
                userPortfoliosArr.map((portfolio, idx) => (
                    <Link to={`/stocks/${portfolio?.stock?.ticker}`}>
                        <div key={idx} className="stock-card">
                            <div class="card-ticker-shares">
                                <div>{portfolio?.stock?.ticker}</div>
                                <div>{portfolio?.quantity} shares</div>
                            </div>
                            <div>{portfolio?.stock?.price}$price</div>
                        </div>
                    </Link>
                )))}
            <Watchlist />
        </>
    )
}
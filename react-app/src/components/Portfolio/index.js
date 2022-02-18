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
            <h2>Portfolio</h2>
                {userPortfoliosArr.length > 0 && <ul>
                    {userPortfoliosArr.map((portfolio, idx) => (
                        <li key={idx}>
                            <Link to={`/stocks/${portfolio?.stock?.ticker}`}>{portfolio?.stock?.ticker}</Link>
                            <span>{portfolio?.stock?.price}</span>
                            <span>{portfolio?.quantity}</span>
                        </li>))}
                    </ul>}
            <Watchlist />
        </>
    )
}
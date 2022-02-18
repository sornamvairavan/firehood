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
            {userPortfoliosArr.length > 0 && (
            <table>
                <thead>
                    <tr>
                        <th>Stock</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                {userPortfoliosArr.map((portfolio, idx) => (
                    <tr key={idx}>
                        <td><Link to={`/stocks/${portfolio?.stock?.ticker}`}>{portfolio?.stock?.ticker}</Link></td>
                        <td>{portfolio?.stock?.price}</td>
                        <td>{portfolio?.quantity}</td>
                    </tr>
                ))}
                </tbody>
            </table>)}               
            <Watchlist />
        </>
    )
}
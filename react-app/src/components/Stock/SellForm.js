import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getUserPortfolios, sellStock } from '../../store/portfolio'
import { authenticate } from '../../store/session'


export default function SellForm({ stockId, stockPrice, stockTicker, stockIntPrice }) {
    const dispatch = useDispatch()
    const history = useHistory()

    const userPortfoliosObj = useSelector(state => state.portfolio.portfolios)
    const userPortfoliosArr = Object.values(userPortfoliosObj)
    const portfolio = userPortfoliosArr.find(portfolio => portfolio.stock_id === +stockId)

    const [errors, setErrors] = useState([])
    const [quantity, setQuantity] = useState(0)
    const [cost, setCost] = useState(0.00)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getUserPortfolios())
        dispatch(authenticate())
    }, [dispatch, isLoaded])

    useEffect(() => {
        setCost(quantity * parseFloat(stockIntPrice))
        setErrors([])
    }, [quantity, stockIntPrice])

    useEffect(() => {
        return () => {
         setErrors([])
         setQuantity(0)
         setCost(0)
        }
      }, [])

    const sellShares = async (e) => {
        e.preventDefault()

        const payload = {
            stockId,
            quantity, 
            cost
        }

        const data = await dispatch(sellStock(payload))
        if (data.errors) {
            setErrors(data.errors)
        } else {
            setIsLoaded(true)
            history.push("/")
        }
    }


    return (
        <div className='share-form-container'>
            <h4 className='portfolio-title-container'>Sell {stockTicker}</h4>
            <div>
                {errors?.length > 0 && <ul className="errors">
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>}
            </div>
            <form className="share-form">
                <div className="stock-card">
                    <label htmlFor='quantity'>Quantity</label>
                    <input
                    type="number"
                    min="1"
                    autoComplete="off"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="shares-input"
                    />
                </div>
                <div className="stock-card">
                    <label htmlFor='marketprice' className='market-price'>Market Price</label>
                    <span>{stockPrice}</span>
                </div>
                <div className="stock-card-cost">
                    <span>Estimated Cost: </span>
                    <span>${cost.toFixed(2)}</span>
                </div>
                <div className='buy-sell-button'>
                    <button type="submit" onClick={sellShares} disabled={!quantity || quantity <= 0} className="sell-review-order">Sell Shares</button>
                </div>
                <div className="stock-card-user-sell">{portfolio?.quantity || "0"} shares available</div>
            </form>
        </div>
    )
}
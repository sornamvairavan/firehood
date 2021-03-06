import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { buyStock } from '../../store/portfolio'
import { authenticate } from '../../store/session'


export default function BuyForm({ stockId, stockPrice, stockTicker, stockFloatPrice }) {
    const dispatch = useDispatch()

    const userCash = useSelector((state) => state.session.user.cash);
    const [errors, setErrors] = useState([])
    const [quantity, setQuantity] = useState(0)
    const [cost, setCost] = useState(0.00)
    const [isLoaded, setIsLoaded] = useState(false)
    const [message, setMessage] = useState("")

    useEffect(() => {
        setCost(quantity * parseFloat(stockFloatPrice))
        setErrors([])
    }, [quantity, stockFloatPrice])

    useEffect(() => {
        dispatch(authenticate())
    }, [dispatch, isLoaded])

    useEffect(() => {
        return () => {
         setErrors([])
         setQuantity(0)
         setCost(0)
         setIsLoaded(false)
        }
      }, [])

    useEffect(() => {
        const timedMessage = setTimeout(() => {
            setMessage("")
        }, (2000))

        return () => clearTimeout(timedMessage)
    }, [message])

    const buyShares = async (e) => {
        e.preventDefault()

        const payload = {
            stockId, 
            quantity,
            price: stockFloatPrice,
            cost
        }

        const data = await dispatch(buyStock(payload))
        if (data.errors) {
            setErrors(data.errors)
        } else {
            setIsLoaded(!isLoaded)
            setQuantity(0)
            setCost(0.00)
            setMessage("Successfull!")
        }
    }

    return (
        <div className='share-form-container'>
            <h4 className="portfolio-title-container">Buy {stockTicker} <span id="message">{message}</span></h4>
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
                    <span>${cost.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                </div>
                <div className="buy-sell-button">
                    <button type="submit" onClick={buyShares} disabled={!quantity || quantity <= 0} className="buy-review-order">Buy Shares</button>
                </div>
                <div className="stock-card-user-buy">{userCash} buying power available</div>
            </form>
        </div>
    )
}
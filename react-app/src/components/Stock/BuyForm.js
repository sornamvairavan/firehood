import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { buyStock } from '../../store/portfolio'

export default function BuyForm({ stockId, stockPrice, stockTicker }) {
    const dispatch = useDispatch()
    const history = useHistory()

    const [errors, setErrors] = useState([])
    const [quantity, setQuantity] = useState(0)

    const buyShares = async (e) => {
        e.preventDefault()

        const payload = {
            stockId, 
            quantity,
            price: 100
        }

        const data = await dispatch(buyStock(payload))
        if (data.errors) {
            setErrors(data.errors)
        } else {
            history.push("/")
        }
    }

    return (
        <div className='share-form-container'>
            <h4 className="portfolio-title-container">Buy {stockTicker}</h4>
            <div>
                {errors?.length > 0 && <ul className="errors">
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>}
            </div>
            <h5 className="stock-card">Buying Power: </h5>
            <form className="share-form">
                <div className="stock-card">
                    <label htmlFor='quantity'>Quantity</label>
                    <input
                    type="number"
                    min="0"
                    autoComplete="off"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="shares-input"
                    />
                </div>
                <div className="stock-card">
                    <label htmlFor='marketprice'>Market Price</label>
                    <span>{stockPrice}</span>
                </div>
                <div className="stock-card">
                    <h6>Estimated Cost: </h6>
                    <span>$</span>
                </div>
                <button type="submit" onClick={buyShares} disabled={!quantity}>Buy Shares</button>
            </form>
        </div>
    )
}
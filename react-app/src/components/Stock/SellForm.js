import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { sellStock } from '../../store/portfolio'

export default function SellForm({ stockId, stockPrice, stockTicker }) {
    const dispatch = useDispatch()
    const history = useHistory()

    // const portfolio = useSelector((state) => state.session.portfolios.portfolio);
    const [errors, setErrors] = useState([])
    const [quantity, setQuantity] = useState(0)

    const sellShares = async (e) => {
        e.preventDefault()

        const payload = {
            stockId,
            quantity
        }

        const data = await dispatch(sellStock(payload))
        if (data.errors) {
            setErrors(data.errors)
        } else {
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
                <button type="submit" onClick={sellShares} disabled={!quantity}>Sell Shares</button>
                <div className="stock-card-user">Currently holding shares</div>
            </form>
        </div>
    )
}
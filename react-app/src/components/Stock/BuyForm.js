import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { buyStock } from '../../store/portfolio'

export default function BuyForm({ stockId }) {
    const dispatch = useDispatch()
    const history = useHistory()

    const [errors, setErrors] = useState([])
    const [quantity, setQuantity] = useState(0)

    const buyShares = async (e) => {
        e.preventDefault()

        const payload = {
            stockId, 
            quantity,
            purchase_price: 100
        }

        const data = await dispatch(buyStock(payload))
        if (data.errors) {
            setErrors(data.errors)
        } else {
            history.push("/")
        }
    }

    return (
        <>
        <div className='share-form-container1'>
            <div>
                {errors?.length > 0 && <ul className="errors">
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>}
            </div>
            <h5>Buying Power: </h5>
            <form className="share-form">
                <div>
                    <label htmlFor='quantity'>Quantity</label>
                    <input
                    type="number"
                    min="0"
                    autoComplete="off"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='marketprice'>Market Price</label>
                    <span>$</span>
                </div>
                <div>
                    <h6>Estimated Cost: </h6>
                    <span>$</span>
                </div>
                <button type="submit" onClick={buyShares} disabled={!quantity}>Buy Shares</button>
            </form>
        </div>
     </>
    )
}
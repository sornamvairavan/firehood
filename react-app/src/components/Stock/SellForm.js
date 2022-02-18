import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { sellStock } from '../../store/portfolio'

export default function SellForm({ stockId }) {
    const dispatch = useDispatch()
    const history = useHistory()

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
        <>
        <div className="share-form">
            <div>
                {errors?.length > 0 && <ul className="errors">
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>}
            </div>
            <h5>Currently held: </h5>
            <form>
                <label htmlFor='quantity'>Quantity</label>
                <input
                type="number"
                min="0"
                autoComplete="off"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                />
                <label htmlFor='marketprice'>Market Price</label>
                <span>$</span>
                <h6>Estimated Cost: $</h6>
                <button type="submit" onClick={sellShares} disabled={!quantity}>Sell Shares</button>
            </form>
        </div>
     </>
    )
}
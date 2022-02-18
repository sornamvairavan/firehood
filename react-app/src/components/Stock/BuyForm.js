import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { buyStock } from '../../store/portfolio'
import { getAllStocks } from '../../store/stock'

export default function BuyForm({ stockId }) {
    const dispatch = useDispatch()
    const history = useHistory()

    const [errors, setErrors] = useState([])
    const [quantity, setQuantity] = useState(0)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getAllStocks())
        .then(() => setIsLoaded(true))
    }, [dispatch, isLoaded])

    const buyShares = async (e) => {
        e.preventDefault()

        const payload = {
            stockId, 
            quantity,
            purchase_price: 100
        }

        console.log(payload, "payload")

        const data = await dispatch(buyStock(payload))
        if (data.errors) {
            setErrors(data.errors)
        } else {
            setIsLoaded(!isLoaded)
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
            <h5>Buying Power: </h5>
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
                <h6>Estimated Total: $</h6>
                <button type="submit" onClick={buyShares} disabled={!quantity}>Buy Shares</button>
            </form>
        </div>
     </>
    )
}
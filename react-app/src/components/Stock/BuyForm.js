import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


export default function BuyForm({ stockId }) {
    const dispatch = useDispatch()

    const [errors, setErrors] = useState([])
    const [quantity, setQuantity] = useState(0)

    useEffect(() => {
        
    }, [])

    const buyShares = async (e) => {
        e.preventDefault()

        const payload = {
            stockId, 
            quantity,
            purchase_price: $100
        }

        const data = await dispatch(buyStock(payload))
        if (data.errors) {
            setErrors(data.errors)
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
                autoComplete="off"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                />
                <label htmlFor='marketprice'>Market Price</label>
                <span>$</span>
                <h6>Estimated Total: $</h6>
                <button type="submit" onClick={buyShares}>Buy Shares</button>
            </form>
        </div>
     </>
    )
}
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


export default function SellForm({ stockId }) {
    const dispatch = useDispatch()

    const [errors, setErrors] = useState([])
    const [quantity, setQuantity] = useState(0)

    useEffect(() => {
        
    }, [])

    // const addToList = async (e) => {
    //     e.preventDefault()

    //     const payload = {
    //         stockId, 
    //         watchlistId
    //     }

    //     const data = await dispatch(addStockToList(payload))
    //     if (data.errors) {
    //         setErrors(data.errors)
    //     } else {
    //         dispatch(getUserWatchlists())
    //         setShowAddtoListModal(false)
    //     }
    // }

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
                autoComplete="off"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                />
                <label htmlFor='marketprice'>Market Price</label>
                <span>$</span>
                <h6>Estimated Cost: $</h6>
                <button type="submit">Sell Shares</button>
            </form>
        </div>
     </>
    )
}
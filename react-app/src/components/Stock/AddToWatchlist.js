import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserWatchlists } from '../../store/watchlist'
import { addStockToList } from '../../store/watchlist';

export default function AddToWatchlistForm({ setShowAddtoListModal, stockId, stockTicker }) {
    const dispatch = useDispatch()

    const userWatchlistsObj = useSelector(state => state.watchlist.watchlists)
    const userWatchlistsArr = Object.values(userWatchlistsObj)

    const [errors, setErrors] = useState([])
    const [watchlistId, setWatchlistId] = useState("")


    useEffect(() => {
        setErrors([])
    }, [watchlistId])

    useEffect(() => {
        dispatch(getUserWatchlists())
    }, [dispatch])

    const addToList = async (e) => {
        e.preventDefault()

        const payload = {
            stockId, 
            watchlistId
        }

        const data = await dispatch(addStockToList(payload))
        if (data.errors) {
            setErrors(data.errors)
        } else {
            setShowAddtoListModal(false)
            alert(`Successfully added ${stockTicker} to List`)
        }
    }

    return (
        <>
        <div>
            <i className="fa-solid fa-xmark" onClick={() => setShowAddtoListModal(false)} title="Close"></i>
            <h3 className="watchlist-form-title">Add Stock to Your Lists</h3>
            <div>
                {errors?.length > 0 && <ul className="errors">
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>}
            </div>
            <form className="watchlist-form">
                <select
                required
                value={watchlistId}
                onChange={(e) => setWatchlistId(e.target.value)}
                >
                <option value='' disabled={true}>Select a List</option>
                {userWatchlistsArr.map((watchlist) => (
                    <option key={watchlist?.id} value={watchlist?.id}>{watchlist?.name}</option>
                ))}
                </select>
                <button onClick={addToList} type="submit" disabled={!watchlistId} className="save-button">Save Changes</button>
            </form>
        </div>
     </>
    )
}
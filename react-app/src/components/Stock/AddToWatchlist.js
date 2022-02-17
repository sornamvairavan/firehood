import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getUserWatchlists } from '../../store/watchlist'

export default function AddToWatchlistForm({ setShowAddtoListModal }, stockId) {
    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const [errors, setErrors] = useState([])

    const addToWatchlist = async (e) => {
        e.preventDefault()

        // const payload = {
        //     name: name
        // }

        // const data = await dispatch(addOneWatchlist(payload))
        // if (data.errors) {
        //     setErrors(data.errors)
        // } else {
        //     dispatch(getUserWatchlists())
        //     setShowAddtoListModal(false)
        // }
        
    }

    return (
        <div className="watchlist-form">
            <div>
                {errors?.length > 0 && <ul className="errors">
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>}
            </div>
            <form>
                <input
                autoComplete="off"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
                <span onClick={() => setShowAddtoListModal(false)}>Cancel</span>
                <button onClick={addToWatchlist} type="submit" disabled={!name}>Create List</button>
            </form>
        </div>
    )
}
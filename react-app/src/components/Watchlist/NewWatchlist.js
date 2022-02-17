import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addOneWatchlist, getUserWatchlists } from '../../store/watchlist'
// import './Watchlists.css'

export default function AddWatchlistForm({ setShowAddForm }) {
    const dispatch = useDispatch()

    const userId = useSelector(state => state.session.user?.id)
    const [name, setName] = useState("")

    const addWatchlist = async (e) => {
        e.preventDefault()

        const payload = {
            name: name
        }

        const newWatchlist = await dispatch(addOneWatchlist(payload))

        if (newWatchlist) {
            dispatch(getUserWatchlists(userId))
            setShowAddForm(false)
        }
        
    }

    return (
        <div className="watchlist-form">
            <form>
                <input
                autoComplete="off"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
                <span onClick={() => setShowAddForm(false)}>Cancel</span>
                <button onClick={addWatchlist} type="submit" disabled={!name}>Create List</button>
            </form>
        </div>
    )
}
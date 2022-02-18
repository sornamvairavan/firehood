import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addOneWatchlist } from '../../store/watchlist'
// import './Watchlists.css'

export default function NewWatchlistForm({ setShowNewForm }) {
    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const [errors, setErrors] = useState([])

    const newWatchlist = async (e) => {
        e.preventDefault()

        const data = await dispatch(addOneWatchlist({name}))
        if (data.errors) {
            setErrors(data.errors)
        } else {
            setShowNewForm(false)
        }
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
                <span onClick={() => setShowNewForm(false)}>Cancel</span>
                <button onClick={newWatchlist} type="submit" disabled={!name}>Create List</button>
            </form>
        </div>
    )
}
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
            <form className="new-watchlist-form">
                <input
                autoComplete="off"
                placeholder='List name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
                <div className='form-button-container'>
                    <span onClick={() => setShowNewForm(false)} className="cancel-button">Cancel</span>
                    <button onClick={newWatchlist} type="submit" disabled={!name} className="create-button">Create List</button>
                </div>
            </form>
        </div>
    )
}
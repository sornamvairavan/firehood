import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editWatchlistById } from '../../store/watchlist'


export default function EditWatchlistForm({ watchlistId, setShowEditModal }) {
    const dispatch = useDispatch()

    const watchlist = useSelector(state => state.watchlist?.watchlists[+watchlistId])

    const [name, setName] = useState(watchlist?.name)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        setErrors([])
    }, [name])

    const editWatchlist = async (e) => {
        e.preventDefault()

        const payload = {
            watchlistId,
            name
        }

        const data = await dispatch(editWatchlistById(payload))
        if (data.errors) {
            setErrors(data.errors)
        } else {
            setShowEditModal(false)
        }

    }

    return (
        <>
            <div>
                <i className="fa-solid fa-xmark" onClick={() => setShowEditModal(false)}></i>
                <h3 className="watchlist-form-title">Edit List</h3>
                <div>
                    {errors?.length > 0 && <ul className="errors">
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>}
                </div>
                <form className="watchlist-form">
                    <input
                    autoComplete="off"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                    <button onClick={editWatchlist} type="submit" disabled={!name || name==watchlist?.name} className="save-button">Save Changes</button>
                </form>
            </div>
         </>
    )
}
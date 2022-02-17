import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getUserWatchlists, editWatchlistById, deleteWatchlistById } from "../../store/watchlist"


export default function Watchlist() {
    const dispatch = useDispatch()

    const userId = useSelector(state => state.session.user?.id)
    const userWatchlistsObj = useSelector(state => state.watchlist.watchlists)
    const userWatchlistsArr = Object.values(userWatchlistsObj)

    useEffect(() => {
        dispatch(getUserWatchlists(userId))
    }, [dispatch])

    return (
        <div>
            <h2>Watchlist</h2>
            <div className="watchlist-list">
            {userWatchlistsArr.length > 0 && userWatchlistsArr.map((watchlist, idx) => (
                <div key={idx}>
                    <div>
                        <span>{watchlist.name}</span>
                        <button value={watchlist.id}>Edit</button>
                        <button value={watchlist.id}>Delete</button>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}
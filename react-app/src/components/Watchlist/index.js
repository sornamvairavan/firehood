import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from 'react-router-dom'
import { Modal } from '../../context/Modal'
import EditWatchlistForm from "./EditWatchlist"
import AddWatchlistForm from "./NewWatchlist"
import { getUserWatchlists, deleteWatchlistById } from "../../store/watchlist"


export default function Watchlist() {
    const dispatch = useDispatch()

    const [isLoaded, setIsLoaded] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [editWatchlistId, setEditWatchlistId] = useState("")
    const userId = useSelector(state => state.session.user?.id)
    const userWatchlistsObj = useSelector(state => state.watchlist.watchlists)
    const userWatchlistsArr = Object.values(userWatchlistsObj)

    useEffect(() => {
        dispatch(getUserWatchlists(userId))
            .then(() => setIsLoaded(true)) 
    }, [dispatch])

    const openAddWatchlistForm = (e) => {
        setShowAddForm(true)
    }
    
    const openEditWatchlistForm = (e) => {
        setEditWatchlistId(e.target.id)
        setShowEditModal(true)
    }

    const deleteWatchlist = (e) => {
        return dispatch(deleteWatchlistById(Number(e.target.id)))
            .then(() => setIsLoaded(!isLoaded))
      }

    return (
        <div>
            <span>Watchlist</span>
            <i className="fa-solid fa-plus" onClick={openAddWatchlistForm}></i>
            <div className="watchlist-list">
            {showAddForm && (
                <AddWatchlistForm setShowAddForm={setShowAddForm}/>
            )}
            {userWatchlistsArr.length > 0 && userWatchlistsArr.map((watchlist, idx) => (
                <div key={idx}>
                    <div>
                        <span>{watchlist.name}</span>
                        <i className="fa-solid fa-gear" onClick={openEditWatchlistForm} id={watchlist.id}></i>
                        <i className="fa-solid fa-circle-xmark" onClick={deleteWatchlist} id={watchlist.id}></i>
                        {watchlist.stocks?.length > 0 && <ul>
                            {watchlist.stocks.map((stock, idx) => <li key={idx}><Link to={`/stocks/${stock.ticker}`}>{stock.ticker}</Link></li>)}
                            </ul>}
                    </div>
                </div>
            ))}
            </div>
            {showEditModal && (
                <Modal onClose={() => setShowEditModal(false)}>
                    <EditWatchlistForm watchlistId={editWatchlistId} setShowEditModal={setShowEditModal}/>
                </Modal>
            )}
        </div>
    )
}
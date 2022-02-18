import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from 'react-router-dom'
import { Modal } from '../../context/Modal'
import EditWatchlistForm from "./EditWatchlist"
import NewWatchlistForm from "./NewWatchlist"
import { getUserWatchlists, deleteWatchlistById, removeStockFromList } from "../../store/watchlist"
import './Watchlist.css'

export default function Watchlist() {
    const dispatch = useDispatch()

    const [isLoaded, setIsLoaded] = useState(false);
    const [showNewForm, setShowNewForm] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [editWatchlistId, setEditWatchlistId] = useState("")
    const userWatchlistsObj = useSelector(state => state.watchlist.watchlists)
    const userWatchlistsArr = Object.values(userWatchlistsObj)

    useEffect(() => {
        dispatch(getUserWatchlists())
            .then(() => setIsLoaded(true)) 
    }, [dispatch, isLoaded])

    const openNewWatchlistForm = (e) => {
        setShowNewForm(true)
    }
    
    const openEditWatchlistForm = (e) => {
        setEditWatchlistId(e.target.id)
        setShowEditModal(true)
    }

    const deleteWatchlist = (e) => {
        return dispatch(deleteWatchlistById(Number(e.target.id)))
            .then(() => setIsLoaded(!isLoaded))
      }


    const removeStock = (stockId, watchlistId) => {
        let payload = {
            stockId,
            watchlistId
        }
        return dispatch(removeStockFromList(payload))
            .then(() => setIsLoaded(!isLoaded))
    }   


    return (
        <div>
            <span>Watchlist</span>
            <i className="fa-solid fa-plus" onClick={openNewWatchlistForm}></i>
            <div className="watchlist-list">
            {showNewForm && (
                <NewWatchlistForm setShowNewForm={setShowNewForm}/>
            )}
             {userWatchlistsArr.length > 0 && userWatchlistsArr.map((watchlist, idx) => (
                <div key={idx}>
                        <h3 className="watchlist-title">{watchlist.name}</h3>
                        <i className="fa-solid fa-gear" onClick={openEditWatchlistForm} id={watchlist.id}></i>
                        <i className="fa-solid fa-circle-xmark" onClick={deleteWatchlist} id={watchlist.id}></i>
                        {watchlist.stocks?.length > 0 &&  (
                            watchlist.stocks.map((stock, idx) => (
                                <div key={idx}>
                                    <div className="stock-card">
                                        <Link to={`/stocks/${stock?.ticker}`}>
                                            <div>
                                                <h4>{stock?.ticker}</h4>
                                            </div>
                                            <div>{stock?.price}$price</div>
                                        </Link>
                                        <i className="fa-solid fa-xmark" onClick={(e) => removeStock(stock.id, watchlist.id)}></i>
                                    </div>
                                </div>
                            )))}
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
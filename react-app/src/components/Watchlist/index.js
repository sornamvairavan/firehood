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

    useEffect(() => {
        return () => {
         setIsLoaded(false)
        }
      }, [])

    const openNewWatchlistForm = (e) => {
        setShowNewForm(true)
    }
    
    const openEditWatchlistForm = (watchlistId) => {
        setEditWatchlistId(watchlistId)
        setShowEditModal(true)
    }

    const deleteWatchlist = (watchlistId) => {
        const confirmed = window.confirm("Are you sure you want to delete this list?")
        if (confirmed) {
            return dispatch(deleteWatchlistById(Number(watchlistId)))
                .then(() => setIsLoaded(!isLoaded))
        }
      }


    const removeStock = (stockId, watchlistId) => {
        const confirmed = window.confirm("Are you sure you want to remove this stock from the list?")
            if (confirmed) {
                let payload = {
                stockId,
                watchlistId
            }
            return dispatch(removeStockFromList(payload))
                .then(() => setIsLoaded(!isLoaded))
        }
    }   


    return (
        <div>
            <div className="watchlist-title-container">
                <span className="watchlist-title">Lists</span>
                <span><i className="fa-solid fa-plus" onClick={openNewWatchlistForm} title="Add new list"></i></span>
            </div>
            <div>
            {showNewForm && (
                <NewWatchlistForm setShowNewForm={setShowNewForm}/>
            )}
            <div className="watchlists-container">
             {userWatchlistsArr.length > 0 && userWatchlistsArr.map((watchlist, idx) => (
                <div key={idx}>
                    <div className="watchlist-name-container">
                        <div>{watchlist.name}</div>
                        <div>
                            <i className="fa-solid fa-gear" onClick={() => openEditWatchlistForm(watchlist.id)} title="Edit list"></i>
                            <i className="fa-solid fa-circle-xmark" onClick={() => deleteWatchlist(watchlist.id)} title="Delete list"></i>
                        </div>
                    </div>
                    {watchlist.stocks?.length > 0 &&  (
                        watchlist.stocks.map((stock, idx) => (
                            <div key={idx}>
                                    <div className="stock-card">
                                        <div>
                                        <Link to={`/stocks/${stock?.ticker}`}>
                                            <h5>{stock?.ticker}</h5>
                                        </Link>
                                        </div>
                                        <div>
                                            <span className="remove-price">
                                                <div className="list-price">{stock?.price}</div>
                                                <span><i className="fa-solid fa-xmark remove fa-xs" title="Remove stock from list" onClick={(e) => removeStock(stock.id, watchlist.id)}></i></span>
                                            </span>
                                        </div>
                                    </div>
                                
                            </div>
                        )))}
                    </div>
                ))}
                </div>
            </div>
            {showEditModal && (
                <Modal onClose={() => setShowEditModal(false)}>
                    <EditWatchlistForm watchlistId={editWatchlistId} setShowEditModal={setShowEditModal}/>
                </Modal>
            )}
        </div>
    )
}
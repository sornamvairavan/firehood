import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneStock } from '../../store/stock';
import { Modal } from '../../context/Modal'
import AddToWatchlistForm from './AddToWatchlist';

export default function Stocks() {
    const dispatch = useDispatch();
    const { ticker } = useParams();
    const stock = useSelector(state => state.stock?.stocks[ticker])
    // const price = useSelector(state => state.stock?.price)

    const [showAddtoListModal, setShowAddtoListModal] = useState(false)
    const [stockId, setStockId] = useState("")

    useEffect(() => {
        dispatch(getOneStock(ticker))
    }, [dispatch, ticker])

    const openWishlistForm = (e) => {
        e.preventDefault()
        setStockId(Number(e.target.id))
        setShowAddtoListModal(true)
    }

    return (
        <>
            <div>{stock?.company_name}</div>
            <div>{stock?.ticker}</div>
            <div>${stock?.price}</div>
            <button onClick={openWishlistForm} id={stock?.id}>Add to Watchlist</button>
            {showAddtoListModal && (
            <Modal onClose={() => setShowAddtoListModal(false)}>
                <AddToWatchlistForm stockId={stockId} setShowAddtoListModal={setShowAddtoListModal}/>
            </Modal>
        )}
        </>
    )
}
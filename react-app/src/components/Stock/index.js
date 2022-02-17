import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllStocks, getOneStock } from '../../store/stock';
import { Modal } from '../../context/Modal'
import { addStockToList } from '../../store/watchlist';
import AddToWatchlistForm from './AddToWatchlist';

export default function Stocks() {
    const dispatch = useDispatch();
    const { ticker } = useParams();
    const stock = useSelector(state => state.stock?.stocks[ticker])
    const price = useSelector(state => state.stock?.price)

    const [showAddtoListModal, setShowAddtoListModal] = useState(false)

    useEffect(() => {
        dispatch(getAllStocks())
        dispatch(getOneStock(ticker))
    }, [dispatch, ticker])

    const openWishlistForm = (e) => {
        e.preventDefault()
        setShowAddtoListModal(true)
    }

    return (
        <>
            <div>{stock?.company_name}</div>
            <div>{stock?.ticker}</div>
            <div>${price}</div>
            <button onClick={openWishlistForm}>Add to Watchlist</button>
            {showAddtoListModal && (
            <Modal onClose={() => setShowAddtoListModal(false)}>
                <AddToWatchlistForm stockId={stock.id} setShowAddtoListModal={setShowAddtoListModal}/>
            </Modal>
        )}
        </>
    )
}
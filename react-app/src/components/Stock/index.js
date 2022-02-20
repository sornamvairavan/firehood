import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneStock } from '../../store/stock';
import { Modal } from '../../context/Modal'
import AddToWatchlistForm from './AddToWatchlist';
import BuyForm from './BuyForm';
import SellForm from './SellForm';
import './Stock.css'

export default function Stocks() {
    const dispatch = useDispatch();
    const { ticker } = useParams();
    const stock = useSelector(state => state.stock?.stocks[ticker])

    const [showAddtoListModal, setShowAddtoListModal] = useState(false)
    const [stockId, setStockId] = useState(stock?.id)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        // dispatch(getAllStocks())
        dispatch(getOneStock(ticker))
        .then(() => setIsLoaded(true))
    }, [dispatch, ticker, isLoaded])

    const openWishlistForm = (e) => {
        e.preventDefault()
        setStockId(Number(e.target.id))
        setShowAddtoListModal(true)
    }

    return (
        <>
            <div>{stock?.company_name}</div>
            <div>{stock?.ticker}</div>
            <div>{stock?.price}</div>
            <button onClick={openWishlistForm} id={stock?.id} className="add-to-list">Add to Lists</button>
            <div className='share-forms'>
                <BuyForm stockId={stock?.id} stockPrice={stock?.price} stockTicker={stock?.ticker} />
                <SellForm stockId={stock?.id} stockPrice={stock?.price} stockTicker={stock?.ticker}/>
            </div>
            {showAddtoListModal && (
            <Modal onClose={() => setShowAddtoListModal(false)}>
                <AddToWatchlistForm stockId={stockId} setShowAddtoListModal={setShowAddtoListModal} stockTicker={stock?.ticker}/>
            </Modal>
        )}
        </>
    )
}
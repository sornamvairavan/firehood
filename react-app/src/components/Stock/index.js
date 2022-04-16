import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneStock } from '../../store/stock';
import { Modal } from '../../context/Modal'
import AddToWatchlistForm from './AddToWatchlist';
import BuyForm from './BuyForm';
import SellForm from './SellForm';
import StockChart from './StockChart';
import './Stock.css'


export default function Stocks() {
    const dispatch = useDispatch();
    const { ticker } = useParams();
    const stock = useSelector(state => state.stock?.stocks[ticker])

    const [showAddtoListModal, setShowAddtoListModal] = useState(false)
    const [stockId, setStockId] = useState(stock?.id)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getOneStock(ticker))
        .then(() => setIsLoaded(true))
    }, [dispatch, ticker, isLoaded])

    const openWishlistForm = (e) => {
        e.preventDefault()
        setStockId(Number(e.target.id))
        setShowAddtoListModal(true)
    }

    return (
        <div className='stock-page-container'>  
            <div className='stock-details'>
                <div>{stock?.company_name}</div>
                {/* <div>{stock?.ticker}</div> */}
                <div>{stock?.price}</div>
                <button onClick={openWishlistForm} id={stock?.id} className="add-to-list">Add to Lists</button>
                <StockChart />
            </div>
            <div className='share-forms'>
                <BuyForm stockId={stock?.id} stockPrice={stock?.price} stockTicker={stock?.ticker} stockFloatPrice={stock?.float_price} />
                <SellForm stockId={stock?.id} stockPrice={stock?.price} stockTicker={stock?.ticker} stockFloatPrice={stock?.float_price} />
            </div>
            {showAddtoListModal && (
            <Modal onClose={() => setShowAddtoListModal(false)}>
                <AddToWatchlistForm stockId={stockId} setShowAddtoListModal={setShowAddtoListModal} stockTicker={stock?.ticker}/>
            </Modal>
        )}
        </div>
    )
}
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllStocks, getOneStock } from '../../store/stock';


export default function Stocks() {
    const dispatch = useDispatch();
    const { ticker } = useParams();
    const stock = useSelector(state => state.stock?.stocks[ticker])
    const price = useSelector(state => state.stock?.price)
    console.log("stockkkkkk", stock)

    useEffect(() => {
        dispatch(getAllStocks())
        dispatch(getOneStock(ticker))
    }, [dispatch, ticker])

    return (
        <>
            <div>{stock?.company_name}</div>
            <div>{stock?.ticker}</div>
            <div>${price}</div>
        </>
    )
}
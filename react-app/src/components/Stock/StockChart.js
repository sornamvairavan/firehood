import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getStockChart } from '../../store/stock';
import Plot from 'react-plotly.js';

export default function StockChart() {
    const dispatch = useDispatch();
    const { ticker } = useParams();
    const stock_prices = useSelector(state => state.stock?.prices)
    const stock_dates = useSelector(state => state.stock?.dates)

    const [errors, setErrors] = useState([])

    useEffect(() => {
        return dispatch(getStockChart(ticker))
        .then((data) => {
          if (data.errors) setErrors(data.errors)
        })

    }, [dispatch, ticker])

    return (
        <>  
        <div>
            {errors.length > 0 && <ul className="warning">
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>}
        </div>
            {errors.length === 0 && (
                <Plot
                data={[
                {
                    x: stock_dates,
                    y: stock_prices,
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: {color: 'red'},
                },
                ]}
                layout={{width: 820, height: 500}}
                />
            )}
        </>
    )
}
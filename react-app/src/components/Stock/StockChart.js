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
    const color = useSelector(state => state.stock?.change)

    const [warnings, setWarnings] = useState([])
    const [chartWidth, setChartWidth] = useState(820)

    useEffect(() => {
        return dispatch(getStockChart(ticker))
        .then((data) => {
          if (data.errors) setWarnings(data.errors)
        })

    }, [dispatch, ticker])

    useEffect(() => {
        if (window.screen.width < 1200) {
            setChartWidth(470)
        } else if (window.screen.width < 1350) {
            setChartWidth(700)
        }
    }, [])

    return (
        <>  
            <div>
                {warnings.length > 0 && <ul className="warning">
                {warnings.map((warning, idx) => <li key={idx}>{warning}</li>)}
                </ul>}
            </div>
            {warnings.length === 0 && (
                <Plot
                data={[
                {
                    x: stock_dates,
                    y: stock_prices,
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: {color: color},
                },
                ]}
                layout={{width: chartWidth, height: 440}}
                />
            )}
        </>
    )
}
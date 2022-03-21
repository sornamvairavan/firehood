import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Plot from 'react-plotly.js';
import { portfolioChart} from "../../store/portfolio";

export default function PortfolioChart({totalPortfolioValue}) {
    const dispatch = useDispatch();

    const user_values = useSelector(state => state.portfolio.values)
    const port_dates = useSelector(state => state.portfolio.dates)
    const color = useSelector(state => state.portfolio.change)
    const [chartWidth, setChartWidth] = useState(820)
     
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(portfolioChart())
            .then(() => setIsLoaded(true))
    }, [dispatch, isLoaded])

    useEffect(() => {
        if (window.screen.width < 1350) {
            setChartWidth(470)
        }
    }, [])


    return (
        <div className="portfolio-chart">  
            {(  
            <>
                <div className='portfolio-details'>${totalPortfolioValue}</div>
                <Plot
                data={[
                {
                    x: port_dates,
                    y: user_values,
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: {color: color},
                },
                ]}
                layout={{width: chartWidth, height: 550, title: 'Portfolio Chart', yaxis: {rangemode: 'tozero', tickformat: ',d'}}}
                />
            </>
            )}
        </div>
    )
}
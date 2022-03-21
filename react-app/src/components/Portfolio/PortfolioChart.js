import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Plot from 'react-plotly.js';
import { portfolioChart} from "../../store/portfolio";

export default function PortfolioChart({totalPortfolioValue}) {
    const dispatch = useDispatch();

    const user_values = useSelector(state => state.portfolio.values)
    const port_dates = useSelector(state => state.portfolio.dates)
    const color = useSelector(state => state.portfolio.change)
     
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(portfolioChart())
            .then(() => setIsLoaded(true))
    }, [dispatch, isLoaded])

    let chartWidth = 820
    let chartHeight = 550

    useEffect(() => {
        if (window.innerWidth < 820) {
            chartWidth = 470
            chartHeight = 450
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
                layout={{width: chartWidth, height: chartHeight, title: 'Portfolio Chart', yaxis: {rangemode: 'tozero', tickformat: ',d'}}}
                />
            </>
            )}
        </div>
    )
}
import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Plot from 'react-plotly.js';
import { portfolioChart} from "../../store/portfolio";

export default function PortfolioChart({totalPortfolioValue}) {
    const dispatch = useDispatch();

    const user_values = useSelector(state => state.portfolio.values)
    const port_dates = useSelector(state => state.portfolio.dates)
     
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(portfolioChart())
            .then(() => setIsLoaded(true))
    }, [dispatch, isLoaded])

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
                    marker: {color: 'rgb(0,200,5)'},
                },
                ]}
                layout={{width: 850, height: 550, title: 'Portfolio Chart', yaxis: {rangemode: 'tozero', tickformat: ',d'}}}
                />
            </>
            )}
        </div>
    )
}
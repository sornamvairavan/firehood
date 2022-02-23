import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Plot from 'react-plotly.js';

export default function PortfolioChart() {
    const dispatch = useDispatch();


    useEffect(() => {

    }, [dispatch])

    return (
        <>  
            {/* <div>
                {warnings.length > 0 && <ul className="warning">
                {warnings.map((warning, idx) => <li key={idx}>{warning}</li>)}
                </ul>}
            </div> */}
            {/* {(
                <Plot
                data={[
                {
                    x: stock_dates,
                    y: stock_prices,
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: {color: '#FF5000'},
                },
                ]}
                layout={{width: 820, height: 440}}
                />
            )} */}
        </>
    )
}
/* ----- CONSTANTS ------ */
// const GET_STOCKS = 'stocks/GET_STOCKS'
const GET_STOCK = 'stocks/GET_STOCK'
const GET_CHART = 'stocks/GET_CHART'

/* ----- ACTION CREATORS------ */
// const getStocks = (stocks) => {
//     return {
//         type: GET_STOCKS,
//         stocks
//     }
// }

const getStock = (stock) => {
    return {
        type: GET_STOCK,
        stock
    }
}

const getChart = (stockDetails) => {
    return {
        type: GET_CHART,
        stockDetails
    }
}


/* ------ THUNK ACTIONS ------ */
// export const getAllStocks = () => async (dispatch) => {
//     const response = await fetch(`/api/stocks/`)

//     if (response.ok) {
//         const stocks = await response.json()
//         dispatch(getStocks(stocks))
//         return stocks
//     }
// }

export const getOneStock = (ticker) => async (dispatch) => {
    const response = await fetch(`/api/stocks/${ticker}`)

    if (response.ok) {
        const stock = await response.json()
        dispatch(getStock(stock))
        return stock
    }
}

export const getStockChart = (ticker) => async (dispatch) => {
    const response = await fetch(`/api/stocks/chart/${ticker}`)

    if (response.ok) {
        const chartDetails = await response.json()
        if (chartDetails.errors) {
            return chartDetails;
        }
        dispatch(getChart(chartDetails))
        return chartDetails
    } else {
        return ['An error occurred. Please try again.']
    }
}

/* ------ REDUCER ------ */
const initialState = { stocks: {} };
export default function stockReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        // case GET_STOCKS:
        //     newState = {...state}
        //     newState.stocks = action.stocks.reduce((stocks, stock) => {
        //         stocks[stock.ticker] = stock
        //         return stocks
        //     }, {})
        //     return newState
        case GET_STOCK:
            newState = {...state};
            newState.stocks[action.stock.ticker] = action.stock
            return newState;
        case GET_CHART:
            newState = {...state, prices: action.stockDetails.prices, dates: action.stockDetails.dates, change: action.stockDetails.change}
            return newState;
        default:
            return state;
    }
}
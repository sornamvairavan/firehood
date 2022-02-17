/* ----- CONSTANTS ------ */
const GET_STOCKS = 'stocks/GET_STOCKS'
const GET_STOCK = 'stocks/GET_STOCK'

/* ----- ACTION CREATORS------ */
const getStocks = (stocks) => {
    return {
        type: GET_STOCKS,
        stocks
    }
}

const getStock = (stockDetail) => {
    return {
        type: GET_STOCK,
        stockDetail
    }
}

/* ------ THUNK ACTIONS ------ */
export const getAllStocks = () => async (dispatch) => {
    const response = await fetch(`/api/stocks/`)

    if (response.ok) {
        const stocks = await response.json()
        dispatch(getStocks(stocks))
        return stocks
    }
}

export const getOneStock = (ticker) => async (dispatch) => {
    const response = await fetch(`/api/stocks/${ticker}`)

    if (response.ok) {
        const stockDetail = await response.json()
        dispatch(getStock(stockDetail))
        return stockDetail
    }
}

/* ------ REDUCER ------ */
const initialState = { stocks: {} };
export default function stockReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_STOCKS:
            newState = {...state}
            newState.stocks = action.stocks.reduce((stocks, stock) => {
                stocks[stock.ticker] = stock
                return stocks
            }, {})
            return newState
        case GET_STOCK:
            newState = {...state, price: action.stockDetail[0]["Global Quote"]["05. price"]};
            return newState;
        default:
            return state;
    }
}
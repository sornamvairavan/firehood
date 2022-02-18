/* ----- CONSTANTS ------ */
const GET_PORTFOLIOS = 'portfolios/GET_PORTFOLIOS'
const ADD_PORTFOLIO = 'portfolios/ADD_PORTFOLIO'
const UPDATE_PORTFOLIO = 'portfolios/UPDATE_PORTFOLIO'


/* ----- ACTION CREATORS------ */
const getPortfolios = (portfolios) => {
    return {
        type: GET_PORTFOLIOS,
        portfolios
    }
}

const addPortfolio = (portfolio) => {
    return {
        type: ADD_PORTFOLIO,
        portfolio
    }
}

const updatePortfolio = (portfolio) => {
    return {
        type: UPDATE_PORTFOLIO,
        portfolio
    }
}

/* ------ THUNK ACTIONS ------ */
export const getUserPortfolios = () => async (dispatch) => {
    const response = await fetch(`/api/portfolios/`)

    if (response.ok) {
        const portfolios = await response.json()
        dispatch(getPortfolios(portfolios))
        return portfolios
    }
}

export const addOnePortfolio = ({ stockId, purchase_price, quantity }) => async (dispatch) => {
    const response = await fetch(`/api/portfolios/${stockId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            purchase_price,
            quantity
        })
    })

    if (response.ok) {
        const portfolio = await response.json()
        dispatch(addPortfolio(portfolio))
        return portfolio
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const updatePortfolioById = ({ portfolioId, quantity }) => async (dispatch)  => {
    const response = await fetch(`/api/portfolios/${portfolioId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            quantity
        })
    })

    if (response.ok) {
        const updatedPortfolio = await response.json()
        dispatch(updatePortfolio(updatedPortfolio))
        return updatedPortfolio
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}


/* ------ REDUCER ------ */
const initialState = { portfolios: {} };
export default function portfolioReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_PORTFOLIOS:
            newState = {...state}
            newState.portfolios = action.portfolios.reduce((portfolios, portfolio) => {
                portfolios[portfolio.id] = portfolio
                return portfolios
            }, {})
            return newState
        case ADD_PORTFOLIO:
            newState = {...state}
            newState.portfolios[action.portfolio.id] = action.portfolio
            return newState
        case UPDATE_PORTFOLIO:
            newState = {...state}
            newState.portfolios[action.portfolio.id] = action.portfolio
            return newState
        default:
            return state;
    }
}
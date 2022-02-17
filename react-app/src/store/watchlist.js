/* ----- CONSTANTS ------ */
const GET_WATCHLISTS = 'watchlists/GET_WATCHLISTS'
const ADD_WATCHLIST = 'watchlists/ADD_WATCHLIST'
const EDIT_WATCHLIST = 'watchlists/EDIT_WATCHLIST'
const DELETE_WATCHLIST = 'watchlists/DELETE_WATCHLIST'
const ADD_STOCK = 'watchlists/ADD_STOCK'

/* ----- ACTION CREATORS------ */
const getWatchlists = (watchlists) => {
    return {
        type: GET_WATCHLISTS,
        watchlists
    }
}

const addWatchlist = (watchlist) => {
    return {
        type: ADD_WATCHLIST,
        watchlist
    }
}

const editWatchlist = (watchlist) => {
    return {
        type: EDIT_WATCHLIST,
        watchlist
    }
}

const deleteWatchlist = (watchlistId) => {
    return {
        type: DELETE_WATCHLIST,
        watchlistId
    }
}

const addStock = (watchlist) => {
    return {
        type: ADD_STOCK,
        watchlist
    }
}

/* ------ THUNK ACTIONS ------ */
export const getUserWatchlists = () => async (dispatch) => {
    const response = await fetch(`/api/watchlists/`)

    if (response.ok) {
        const watchlists = await response.json()
        dispatch(getWatchlists(watchlists))
        return watchlists
    }
}

export const addOneWatchlist = (watchlistDetails) => async (dispatch) => {
    const response = await fetch('/api/watchlists/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(watchlistDetails)
    })

    if (response.ok) {
        const watchlist = await response.json()
        dispatch(addWatchlist(watchlist))
        return watchlist
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const editWatchlistById = ({ watchlistId, name }) => async (dispatch)  => {
    const response = await fetch(`/api/watchlists/${watchlistId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name
        })
    })

    if (response.ok) {
        const editedWatchlist = await response.json()
        dispatch(editWatchlist(editedWatchlist))
        return editedWatchlist
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const deleteWatchlistById = (watchlistId) => async (dispatch) => {
    const response = await fetch(`/api/watchlists/${watchlistId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(deleteWatchlist(watchlistId))
        return "Delete successful"
    }
}

export const addStockToList = ({ stockId, watchlistId }) => async (dispatch)  => {
    const response = await fetch(`/api/watchlists/${watchlistId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            stockId
        })
    })

    if (response.ok) {
        const updatedWatchlist = await response.json()
        dispatch(addStock(updatedWatchlist))
        return updatedWatchlist
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
const initialState = { watchlists: {} };
export default function watchlistReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_WATCHLISTS:
            newState = {...state}
            newState.watchlists = action.watchlists.reduce((watchlists, watchlist) => {
                watchlists[watchlist.id] = watchlist
                return watchlists
            }, {})
            return newState
        case ADD_WATCHLIST:
            newState = {...state}
            newState.watchlists[action.watchlist.id] = action.watchlist
            return newState
        case EDIT_WATCHLIST:
            newState = {...state}
            newState.watchlists[action.watchlist.id] = action.watchlist
            return newState
        case DELETE_WATCHLIST:
            newState = {...state}
            delete newState.watchlists[action.watchlistId]
            return newState
        case ADD_STOCK:
            newState = {...state}
            newState.watchlists[action.watchlist.id] = action.watchlist
            return newState
        default:
            return state;
    }
}
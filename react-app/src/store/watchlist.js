/* ----- CONSTANTS ------ */
const GET_WATCHLISTS = 'watchlists/GET_WATCHLISTS'
const ADD_WATCHLIST = 'watchlists/ADD_WATCHLIST'
const EDIT_WATCHLIST = 'watchlists/EDIT_WATCHLIST'
const DELETE_WATCHLIST = 'watchlists/DELETE_WATCHLIST'

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

/* ------ THUNK ACTIONS ------ */
export const getUserWatchlists = (userId) => async (dispatch) => {
    const response = await fetch(`/api/watchlists/${userId}`)

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
          return data.errors;
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
    }
}

export const deleteWatchlistById = (watchlistId) => async (dispatch) => {
    const response = await fetch(`/api/watchlists/${watchlistId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            watchlistId
        })
    })

    if (response.ok) {
        dispatch(deleteWatchlist(watchlistId))
        return "Delete successful"
    }
}


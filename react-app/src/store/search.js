const SEARCH_STOCK = 'search/SEARCH_STOCK'

const search = (search) => ({
    type: SEARCH_STOCK,
    search
})

export const searchStock = (q) => async(dispatch) => {
    const response = await fetch(`/api/search/${q}`)

    if (response.ok) {
        const searchResults = await response.json();
        dispatch(search(searchResults.search))
        return searchResults
    }
}

export default function searchReducer(state = {}, action){
    let newState;
    switch (action.type) {
        case SEARCH_STOCK:
            newState = action.search
            return newState
        default:
            return state
    }
}

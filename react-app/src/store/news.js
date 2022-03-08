const GET_NEWS = 'news/GET_NEWS'

const getTheNews = (news) => ({
    type: GET_NEWS,
    news
})

export const getNews = () => async(dispatch) => {
    const response = await fetch(`/api/news/`)

    if (response.ok) {
        const data = await response.json();
        if (data) {
            dispatch(getTheNews(data))
        } 
        return data
    } 
}

export default function newsReducer(state = {}, action){
    let newState;
    switch (action.type) {
        case GET_NEWS:
            newState = action.news
            return newState
        default:
            return state
    }
}

/* ----- CONSTANTS ------ */
const GET_TRANSACTIONS = 'stocks/GET_TRANSACTIONS'

/* ----- ACTION CREATORS------ */
const getTransactions = (transactions) => {
    return {
        type: GET_TRANSACTIONS,
        transactions
    }
}

/* ------ THUNK ACTIONS ------ */
export const getUserTransactions = () => async (dispatch) => {
    const response = await fetch(`/api/transactions/`)

    if (response.ok) {
        const transactions = await response.json()
        dispatch(getTransactions(transactions))
        return transactions
    }
}

/* ------ REDUCER ------ */
const initialState = { transactions: {} };
export default function transactionReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_TRANSACTIONS:
            newState = {...state}
            newState.transactions = action.transactions.reduce((transactions, transaction) => {
                transactions[transaction.id] = transaction
                return transactions
            }, {})
            return newState
        default:
            return state;
    }
}
import { getUserTransactions } from "../../store/transaction"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


export default function Transaction() {
    const dispatch = useDispatch()

    const userTransactionsObj = useSelector(state => state.transaction.transactions)
    const userTransactionsArr = Object.values(userTransactionsObj)
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(getUserTransactions())
            .then(() => setIsLoaded(true))
    }, [dispatch, isLoaded])

    return (
        <div>
            <h4>Transactions</h4>
            {/* {userTransactionsArr.length === 0 && (
                <h2>You have no transactions</h2>
            )} */}
            {userTransactionsArr.length > 0 && (
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Stock</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                {userTransactionsArr.map((transaction, idx) => (
                    <tr key={idx}>
                        <td>{transaction?.created_at}</td>
                        <td>{transaction?.type}</td>
                        <td>{transaction?.stock?.ticker}</td>
                        <td>$price</td>
                        <td>{transaction?.quantity}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            )}
        </div>
    )
}
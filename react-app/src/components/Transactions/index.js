import { getUserTransactions } from "../../store/transaction"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Transactions.css'

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
        <div className="transactions-container">
            <h4>TRANSACTIONS</h4>
            {userTransactionsArr.length === 0 && (
                <h2>You have no transactions</h2>
            )}
            <div className="table-container">
            {userTransactionsArr.length > 0 && (
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Stock</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                {userTransactionsArr.map((transaction, idx) => (
                    <tr key={idx} className={transaction?.type}>
                        <td>{transaction?.created_at}</td>
                        <td id={transaction.cap_type}>{transaction?.cap_type}</td>
                        <td>{transaction?.stock?.ticker}</td>
                        <td>{transaction?.stock?.price}</td>
                        <td>{transaction?.quantity}</td>
                        <td>{transaction?.value}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            )}
            </div>
        </div>
    )
}
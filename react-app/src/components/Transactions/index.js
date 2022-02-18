import { getUserTransactions } from "../../store/transaction"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


export default function Transaction() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserTransactions())
    }, [dispatch])

    return (
        <div>
            <h4>Transactions</h4>
        </div>
    )
}
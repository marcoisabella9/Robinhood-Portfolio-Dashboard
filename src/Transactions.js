import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import './Transactions.css';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/transactions');
                setTransactions(response.data);
            }   catch (error) {
                console.error('Error fetching transactions: ', error);
            }
        };

        fetchTransactions();
    }, []);

    return (
        <main>
            <h1>Transactions</h1>
            <p>Transaction History:</p>
            <ul>
                {transactions.map((transaction, index) => (
                    <li key={index} id="contentlist">
                        <div>
                            <p><strong>Symbol:</strong> {transaction.symbol}</p>
                            <p><strong>Average Buy Price:</strong> {transaction.average_buy_price}</p>
                            <p><strong>Quantity:</strong> {transaction.quantity}</p>
                            <p><strong>Created At:</strong> {transaction.created_at}</p>
                            <p><strong>Updated At:</strong> {transaction.updated_at}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </main>
    );
}

export default Transactions;
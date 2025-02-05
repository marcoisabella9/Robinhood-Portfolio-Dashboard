import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MainContent.css';

const MainContent = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/account')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const roundToHundredth = (value) => {
        return Math.round(value * 100) / 100;
    };

    const getChangeClass = (change) => {
        return change > 0 ? 'positive' : 'negative';
    }

    return (
        <main>
            <h1>Account Overview</h1>
            {data ? (
                <div id="dashboard">
                    <p>Welcome to your Portfolio Management Dashboard, {data.first_name}!</p>
                    <h2>Account Information</h2>
                    <p>Email: {data.email}</p>
                    <p>Total Value: ${roundToHundredth(data.total_value)}</p>
                    <p>Individual Cash: {'$' + roundToHundredth(data.cash_available_for_withdrawal)}</p>
                    <h2>Stocks Owned</h2>
                    <ul>
                        {Object.keys(data).map((key, index) => (
                            key !== 'cash_available_for_withdrawal' && key !== 'first_name' && key !== 'email' && key !== 'total_value' && (
                                <li key={index} id="contentlist">
                                    <div id={getChangeClass(data[key].price - data[key].average_buy_price)}>
                                        <p><strong>Symbol:</strong> {key}</p>
                                        <p><strong>Name:</strong> {data[key].name}</p>
                                        <p><strong>Quantity:</strong> {data[key].quantity}</p>
                                        <p><strong>Average Buy Price:</strong> {'$' + roundToHundredth(data[key].average_buy_price)}</p>
                                        <p><strong>Current Price:</strong> {'$' + roundToHundredth(data[key].price)}</p>
                                        <p><strong>Owned Market Value:</strong> {'$' + roundToHundredth(data[key].price * data[key].quantity)}</p>
                                    </div>
                                </li>
                            )
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </main>
    );
};

export default MainContent;

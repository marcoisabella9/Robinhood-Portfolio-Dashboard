import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import './Trade.css';

const Trade = () => {
    const [ticker, setTicker] = useState('');
    const [quantity, setQuantity] = useState('');
    const [message, setMessage] = useState('');
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
    }

    const handleBuy = async () => {
        try {
            // Fetch the user's buying power
            const accountResponse = await axios.get('http://localhost:5000/account');
            const buyingPower = accountResponse.data.cash_available_for_withdrawal;

            // Log the values for debugging
            console.log('Buying Power:', buyingPower);
            //console.log('Latest Price:', latestPrice);
            //console.log('Required Amount:', requiredAmount);

            // Check if the buying power is sufficient
            if (parseFloat(quantity) > buyingPower) {
                setMessage('Insufficient buying power');
                return;
            }

            // Proceed with the purchase
            const response = await axios.post('http://localhost:5000/buy_stock', {
                ticker: ticker.toUpperCase(),
                quantity: parseFloat(quantity)
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error buying stock');
        }
    };

    const handleSell = async () => {
        try {
            // fetch positions
            const accountResponse = await axios.get('http://localhost:5000/account');
            const positions = accountResponse.data;

            // check if owns stock
            if (!positions[ticker.toUpperCase()]) {
                setMessage('Insufficient stock quantity');
                return;
            }

            // calculate total value of holdings for stock
            const stockValue = parseFloat(positions[ticker.toUpperCase()].equity);

            // check if user owns enough to sell
            if (parseFloat(quantity) > stockValue) {
                setMessage('Insufficient quantity to sell');
                return;
            }

            const response = await axios.post('http://localhost:5000/sell_stock', {
                ticker: ticker.toUpperCase(),
                quantity: parseFloat(quantity)
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error selling stock');
        }
    };

    return (
        <main>
            <h1>Trade:</h1>
            {data ? (
                <>
                    <p>Buying Power: ${roundToHundredth(data.cash_available_for_withdrawal)}</p>
                    <input
                        type="text"
                        value={ticker}
                        onChange={(e) => setTicker(e.target.value)}
                        placeholder="Enter Ticker"
                    />
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Enter Quantity ($)"
                    />
                    <br></br>
                    <button onClick={handleBuy} style={{ margin: 10, width: '50px', height: '25px' }}><strong>Buy</strong></button>
                    <button onClick={handleSell} style={{ width: '50px', height: '25px' }}><strong>Sell</strong></button>
                    {message && <p>{message}</p>}
                </>
            ) : (
                <p>Loading...</p>
            )}
        </main>
    )
}

export default Trade;
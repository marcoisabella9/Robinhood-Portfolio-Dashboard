import React, { useState } from 'react'
import axios from 'axios'
import './ViewStock.css';

const ViewStock = () => {
    const [ticker, setTicker] = useState('');
    const [searchedTicker, setSearchedTicker] = useState('');
    const [stockData, setStockData] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/search_stock?ticker=${ticker.toUpperCase()}`)
            if (response.data.latest_price) { // could handle better, always exists, but can be empty
                setStockData(response.data);
                setSearchedTicker(ticker.toUpperCase());
                setError(null);
            } else {
                setStockData(null);
                setSearchedTicker('')
                setError('Stock not found');
            }
        } catch (err) {
            setError('Error fetching stock data');
            setStockData(null);
            setSearchedTicker('');
        }
    };

    const roundToHundredth = (value) => {
        return Math.round(value * 100) / 100;
    }

    // to determine text color based on stock performance
    const getChangeClass = (change) => {
        return change > 0 ? 'positive' : 'negative';
    }

    return (
        <main>
            <h1>View Stock</h1>
            <input
                type="text"
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
                placeholder="Enter ticker symbol"
            />
            <button onClick={handleSearch}>Search</button>
            {error && <p>{error}</p>}
            {searchedTicker && stockData && (
                <div id="info">
                    <h2>Stock Data for ${searchedTicker}</h2>
                    <p>Name: {stockData.stock_name}</p>
                    <p>Latest Price: ${roundToHundredth(stockData.latest_price)}</p>
                    <p className={getChangeClass(stockData.week_change)}>
                        Last Weeks Price: ${roundToHundredth(stockData.price_a_week_ago)}, {roundToHundredth(stockData.week_change)}%</p>
                    <p className={getChangeClass(stockData.month_change)}>
                        Last Months Price: ${roundToHundredth(stockData.price_a_month_ago)}, {roundToHundredth(stockData.month_change)}%</p>
                    <p className={getChangeClass(stockData.three_months_change)}>
                        3 Months Price: ${roundToHundredth(stockData.price_3_months_ago)}, {roundToHundredth(stockData.three_months_change)}%</p>
                    <p className={getChangeClass(stockData.year_change)}>
                        Last Years Price: ${roundToHundredth(stockData.price_a_year_ago)}, {roundToHundredth(stockData.year_change)}%</p>
                    <p className={getChangeClass(stockData.five_year_change)}>
                        5 Years Price: ${roundToHundredth(stockData.price_5_years_ago)}, {roundToHundredth(stockData.five_year_change)}%</p>
                    <p>Ratings - {stockData.ratings_summary}</p>
                </div>
            )}
        </main>
    );
};

export default ViewStock;
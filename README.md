# Portfolio Management Dashboard

Welcome to the Portfolio Management Dashboard! This application is designed to help you manage your stock portfolio with ease. It provides a user-friendly interface to view your account overview, track transactions, trade stocks, and view detailed stock information.

## Features

### Account Overview
- **Account Information**: View your account details including your email and total portfolio value.
- **Stocks Owned**: See a detailed list of stocks you own, including the symbol, name, quantity, average buy price, current price, and owned market value.

### Transactions
- **Transaction History**: Track your transaction history with details such as symbol, average buy price, quantity, and timestamps for creation and updates.

### Trade
- **Buy Stocks**: Purchase stocks by specifying the ticker symbol and the amount in dollars you want to invest.
- **Sell Stocks**: Sell stocks by specifying the ticker symbol and the amount in dollars you want to sell.

### View Stock
- **Stock Search**: Search for detailed information about a specific stock by entering its ticker symbol.
- **Stock Data**: View comprehensive stock data including the latest price, historical prices, percentage changes over various periods, and ratings summary.

## Technologies Used
- **Frontend**: React.js for building the user interface.
- **Backend**: Flask for handling API requests and interacting with the Robinhood API.
- **Styling**: CSS for styling the components.

## Getting Started

### Prerequisites
- Node.js and npm installed on your machine.
- Python and pip installed on your machine.
- Robinhood account credentials.

### Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/your-username/portfolio-management-dashboard.git
    cd portfolio-management-dashboard
    ```

2. **Install frontend dependencies**:
    ```sh
    cd frontend
    npm install
    ```

3. **Install backend dependencies**:
    ```sh
    cd backend
    pip install -r requirements.txt
    ```

4. **Set up Robinhood credentials**:
    - Create a `.env` file in the directory and add your Robinhood credentials:
      ```
      ROBINHOOD_USERNAME=your_username
      ROBINHOOD_PASSWORD=your_password
      ```

### Running the Application

1. **Start the backend server**:
    ```sh
    cd backend
    python app.py
    ```

2. **Start the frontend server**:
    ```sh
    cd frontend
    npm start
    ```

3. **Open your browser** and navigate to `http://localhost:3000` to access the Portfolio Management Dashboard.

## Usage

- **Navigate** through the sidebar to access different sections of the dashboard.
- **View your account overview** to see your portfolio's total value and individual stock details.
- **Track your transactions** to keep an eye on your trading history.
- **Trade stocks** by buying or selling using the Trade section.
- **Search for stocks** to get detailed information about specific stocks.

## License

This project is licensed under the MIT License.
# Robinhood Portfolio Management Dashboard

Welcome to the Portfolio Management Dashboard! This application is designed to help you manage your stock portfolio with ease. It provides a user-friendly interface with React to view your account overview, track transactions, trade stocks, and view detailed stock information.

## Features

### Account Overview
- **Account Information**: View your account details including your email and total portfolio value.
- **Stocks Owned**: See a detailed list of stocks you own, including the symbol, name, quantity, average buy price, current price, and owned market value.

![image](https://github.com/user-attachments/assets/a319174b-2a51-4e51-a50e-fe0e3e26474a)


### Transactions
- **Transaction History**: Track your transaction history with details such as symbol, average buy price, quantity, and timestamps for creation and updates.

![image](https://github.com/user-attachments/assets/2fa9b888-2171-4202-89af-3bbfd06e637d)


### Trade
- **Buy Stocks**: Purchase stocks by specifying the ticker symbol and the amount in dollars you want to invest.
- **Sell Stocks**: Sell stocks by specifying the ticker symbol and the amount in dollars you want to sell.

![image](https://github.com/user-attachments/assets/607b6a5b-d257-4dcb-8dc9-eefa1c82aa68)


### View Stock
- **Stock Search**: Search for detailed information about a specific stock by entering its ticker symbol.
- **Stock Data**: View comprehensive stock data including the latest price, historical prices, percentage changes over various periods, and ratings summary.

![image](https://github.com/user-attachments/assets/dc30e83f-df9b-422d-8224-d3ef5168d724)


## Technologies Used
- **Frontend**: React.js for building the user interface.
- **Backend**: Flask for handling API requests and interacting with the Robin Stocks API.
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
    npm install
    ```

3. **Install backend dependencies**:
    ```sh
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
    python app.py
    ```

2. **Start the frontend server**:
    ```sh
    npm start
    ```

3. **Open your browser** and navigate to `http://localhost:3000` to access the Portfolio Management Dashboard.

## Usage

- **Navigate** through the sidebar to access different sections of the dashboard.
- **View your account overview** to see your portfolio's total value and individual stock details.
- **Track your transactions** to keep an eye on your trading history.
- **Trade stocks** by buying or selling using the Trade section.
- **Search for stocks** to get detailed information about specific stocks.

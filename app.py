from flask import Flask, request, jsonify
from flask_cors import CORS
import robin_stocks.robinhood as r
#import pyotp
import requests

app = Flask(__name__)
CORS(app) # Enable CORS for all routes

# Login to Robinhood 
username = ''
password = ''
#totp = pyotp.TOTP("").now()
r.login(username, password, store_session=True) # mfa_code=totp # store_session=True for testing, False for deployment

@app.route('/account')
def get_account():
    response_data = {}
    
    # fetch account info
    account_info = r.profiles.load_account_profile()

    available_cash = account_info['cash']
    response_data['cash_available_for_withdrawal'] = available_cash

    # fetch user info
    user_info = r.profiles.load_user_profile()

    first_name = user_info['first_name']
    response_data['first_name'] = first_name

    email = user_info['email']
    response_data['email'] = email

    # fetch positions
    positions = r.account.build_holdings() # Returns a dictionary where the keys are the stock tickers and the value is another dictionary that has the stock price, quantity held, equity, percent change, equity change, type, name, id, pe ratio, percentage of portfolio, and average buy price

    for key, value in positions.items():
        response_data[key] = value

    # calculate total value
    total_value = sum(float(value['equity']) for key, value in positions.items() if value['equity'] and is_float(value['equity']))
    response_data['total_value'] = total_value

    return jsonify(response_data)

def is_float(value):
    try:
        float(value)
        return True
    except ValueError:
        return False

@app.route('/search_stock', methods=['GET'])
def search_stock_endpoint():
    ticker = request.args.get('ticker')
    stock_data = search_stock(ticker)
    return jsonify(stock_data)

def search_stock(ticker):
    stock_name = r.get_name_by_symbol(ticker)

    latest_price = float(r.stocks.get_latest_price(ticker)[0])
    
    # fetch historical prices for past week, month, 3 months, year, 5 years
    historical_prices_week = r.stocks.get_stock_historicals(ticker, interval='day', span='week')

    # -------------- calculate percent change for times ------------------------------- #
    if historical_prices_week:
        price_a_week_ago = float(historical_prices_week[0]['close_price'])
        week_change = ((latest_price - price_a_week_ago) / price_a_week_ago) * 100
    else :
        week_change = 0
    
    historical_prices_month = r.stocks.get_stock_historicals(ticker, interval='day', span='month')

    if historical_prices_month:
        price_a_month_ago = float(historical_prices_month[0]['close_price'])
        month_change = ((latest_price - price_a_month_ago) / price_a_month_ago) * 100
    else:
        month_change = 0
    
    historical_prices_3months = r.stocks.get_stock_historicals(ticker, interval='day', span='3month')

    if historical_prices_3months:
        price_3_months_ago = float(historical_prices_3months[0]['close_price'])
        three_months_change = ((latest_price - price_3_months_ago) / price_3_months_ago) * 100
    else:
        three_months_change = 0
    
    historical_prices_year = r.stocks.get_stock_historicals(ticker, interval='day', span='year')

    if historical_prices_year:
        price_a_year_ago = float(historical_prices_year[0]['close_price'])
        year_change = ((latest_price - price_a_year_ago) / price_a_year_ago) * 100
    else:
        year_change = 0
    
    historical_prices_5year = r.stocks.get_stock_historicals(ticker, interval='day', span='5year')

    if historical_prices_5year:
        price_5_years_ago = float(historical_prices_5year[0]['close_price'])
        five_year_change = ((latest_price - price_5_years_ago) / price_5_years_ago) * 100
    else:
        five_year_change = 0
    
    # fetch ratings of stock
    ratings = r.stocks.get_ratings(ticker)

    if ratings and ratings.get('summary'): # some stocks dont have ratings
        ratings_summary = ratings['summary']

        # convert and format ratings summary from dict to string
        ratings_summary_str = f"Buy: {ratings_summary['num_buy_ratings']}, Hold: {ratings_summary['num_hold_ratings']}, Sell: {ratings_summary['num_sell_ratings']}"
    else:
        ratings_summary_str = 'Ratings not available for this stock'

    return {
        'stock_name': stock_name,
        'ticker': ticker,
        'latest_price': latest_price,
        'week_change': week_change,
        'price_a_week_ago': price_a_week_ago,
        'month_change': month_change,
        'price_a_month_ago': price_a_month_ago,
        'price_3_months_ago': price_3_months_ago,
        'three_months_change': three_months_change,
        'year_change': year_change,
        'price_a_year_ago': price_a_year_ago,
        'five_year_change': five_year_change,
        'price_5_years_ago': price_5_years_ago,
        'ratings_summary': ratings_summary_str
    }

@app.route('/transactions', methods=['GET'])
def get_transactions():
    trade_history = r.account.get_all_positions()
    transactions = []
    
    for trade in trade_history:
        instrument_url = trade['instrument']    # symbol is in the instrument url, not trade history
        instrument_data = requests.get(instrument_url).json()
        symbol = instrument_data['symbol']

        transactions.append({
                'symbol': symbol,
                'average_buy_price': trade['average_buy_price'],
                'quantity': trade['quantity'],
                'created_at': trade['created_at'],
                'updated_at': trade['updated_at']
        })

    return jsonify(transactions)

@app.route('/buy_stock', methods=['POST'])
def buy_stock_endpoint():
    data = request.get_json()
    ticker = data['ticker']
    quantity = data['quantity']

    # Fetch account info to check buying power
    account_info = r.profiles.load_account_profile()
    buying_power = float(account_info['cash'])

    if quantity > buying_power:
        return jsonify({'message': 'Insufficient buying power'}), 400

    buy_stock(ticker, quantity)
    return jsonify({'message': 'Stock bought successfully'})

@app.route('/sell_stock', methods=['POST'])
def sell_stock_endpoint():
    data = request.get_json()
    ticker = data['ticker']
    quantity = data['quantity']

    # fetch positions to check quantity
    positions = r.account.build_holdings()
    if ticker not in positions:
        return jsonify({'message': 'Insufficient stock quantity'}), 400

    # calculate total value of holdings
    stock_value = float(positions[ticker]['equity'])

    if quantity > stock_value:
        return jsonify({'message': 'Insufficient stock quantity'}), 400

    sell_stock(ticker, quantity)
    return jsonify({'message': 'Stock sold successfully'})

# will attempt to buy stock (ticker) with buying power left in account in dollars (quantity)
def buy_stock(ticker, quantity):
    r.order_buy_fractional_by_price(ticker, quantity)

# will attempt to sell stock (ticker) in dollars (quantity)
def sell_stock(ticker, quantity):
    r.order_sell_fractional_by_price(ticker, quantity)

if __name__ == '__main__':
    app.run(debug=True)
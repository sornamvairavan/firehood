import os
from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Stock, db
import requests
import finnhub
from time import time
from datetime import datetime


stock_routes = Blueprint('stocks', __name__)

FIN_KEY = os.environ.get("FIN_KEY")
FIN_KEY2 = os.environ.get("FIN_KEY2")
YF_KEY = os.environ.get("YF_KEY")
AV_KEY = os.environ.get("AV_KEY")


finnhub_client = finnhub.Client(api_key={FIN_KEY})
finnhub2_client = finnhub.Client(api_key={FIN_KEY2})

def get_price(ticker):
    try:
        data = finnhub_client.quote(ticker)
        price = data["c"]
    except:
        data = finnhub2_client.quote(ticker)
        price = data["c"]
    return price
    
def more_than_sixhours(stock):
    SIX_HOURS_IN_SECONDS = 21600
    epoch_time = time()
    difference = epoch_time - float(stock.last_updated)
    if difference > SIX_HOURS_IN_SECONDS:
        price_of_stock = get_price(stock.ticker_symbol)
        stock.price = price_of_stock
        stock.last_updated = epoch_time
        stock.updated_at = datetime.now()
        db.session.commit()
        return stock.price
    else:
        return False


@stock_routes.route('/')
@login_required
def get_all_stocks():
    stocks = Stock.query.all()
    return jsonify([stock.to_dict() for stock in stocks])


@stock_routes.route('/<ticker>')
@login_required
def get_stock_detail(ticker):

    stock = Stock.query.filter(Stock.ticker_symbol == ticker).first()
    more_than_sixhours(stock)
    
    return stock.to_dict()


@stock_routes.route('/chart/<ticker>')
@login_required
def get_stock_chart(ticker):
    try:
        url = f'https://yfapi.net/v8/finance/chart/{ticker}?range=1mo&region=US&interval=1d&lang=en'

        headers = {
        'accept': "application/json",
        'X-API-KEY': f"{YF_KEY}"
        }

        response = requests.request("GET", url, headers=headers)
        data = response.json()
        close_prices = data["chart"]["result"][0]["indicators"]["quote"][0]["close"]
        timestamp = data["chart"]["result"][0]["timestamp"]

        dates = []
        for epoch_time in timestamp:
            date = datetime.fromtimestamp(epoch_time).strftime('%d %b')
            dates.append(date)

        change = "rgb(0,200,5)" if (close_prices[-2] < close_prices[-1]) else "#FF5000"
        return {"prices": close_prices, "dates": dates, "change": change}
        
    except:
        try:
            url = f'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol={ticker}&apikey={AV_KEY}'
            r = requests.get(url)
            data = r.json()
            dates_dict = data["Time Series (Daily)"]
            
            dates = list(dates_dict.keys())
            close_prices = []
            for date in dates_dict.keys():
                close_prices.append(dates_dict[date]["4. close"])
            change = "rgb(0,200,5)" if (close_prices[-2] < close_prices[-1]) else "#FF5000"
            return {"prices": close_prices, "dates": dates, "change": change}
        except:
            return {"errors": ["No chart available at this time"]}



import os
from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Stock, db
import requests
import finnhub
from time import time
from datetime import datetime

FIN_KEY = os.environ.get("FIN_KEY")
FIN_KEY2 = os.environ.get("FIN_KEY2")
YF_KEY = os.environ.get("YF_KEY")

finnhub_client = finnhub.Client(api_key={FIN_KEY})
finnhub2_client = finnhub.Client(api_key={FIN_KEY2})

def get_price(ticker):
    try:
        data = finnhub_client.quote(ticker)
        price = data["pc"]
        # time = data["t"]
    except:
        data = finnhub2_client.quote(ticker)
        price = data["pc"]
        # time = data["t"]
    return [price]
    
def more_than_oneday(stock):
    epoch_time = time()
    difference = epoch_time - float(stock.last_updated)
    if difference > 86400:
        result = get_price(stock.ticker_symbol)
        stock.price = result[0]
        stock.last_updated = epoch_time
        stock.updated_at = datetime.now()
        db.session.commit()
        return True
    else:
        return False

stock_routes = Blueprint('stocks', __name__)

@stock_routes.route('/')
@login_required
def get_all_stocks():
    stocks = Stock.query.all()
    return jsonify([stock.to_dict() for stock in stocks])


@stock_routes.route('/<ticker>')
@login_required
def get_stock_detail(ticker):

    stock = Stock.query.filter(Stock.ticker_symbol == ticker).first()
    more_than_oneday(stock)
    
    return stock.to_dict()


@stock_routes.route('/chart/<ticker>')
@login_required
def get_stock_chart(ticker):
    # try:
        url = f'https://yfapi.net/v8/finance/chart/{ticker}?range=1mo&region=US&interval=1d&lang=en'

        headers = {
        'accept': "application/json",
        'X-API-KEY': f"{YF_KEY}"
        }
        print("error?")

        response = requests.request("GET", url, headers=headers)
        data = response.json()
        print(data, "DATA")
        close_prices = data["chart"]["result"][0]["indicators"]["quote"][0]["close"]
        timestamp = data["chart"]["result"][0]["timestamp"]

        datetime_array = []
        for epoch_time in timestamp:
            datetime_time = datetime.fromtimestamp(epoch_time).strftime('%d %b')
            datetime_array.append(datetime_time)

        return {"prices": close_prices, "dates": datetime_array}
    # except:
    #     return {"errors": ["No chart available at this time"]}

    # return {"prices": [124, 125], "dates": ["12-Feb", "13-Feb"]}



import os
from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Stock
import requests

API_KEY = os.environ.get("API_KEY")

stock_routes = Blueprint('stocks', __name__)

@stock_routes.route('/')
@login_required
def get_all_stocks():
    stocks = Stock.query.all()
    return jsonify([stock.to_dict() for stock in stocks])


@stock_routes.route('/<ticker>')
@login_required
def get_stock_detail(ticker):

    # url = f'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol={ticker}&apikey={API_KEY}'
    # r = requests.get(url)
    # data = r.json()
    # last_refreshed = data["Meta Data"]["3. Last Refreshed"]
    # close_price = data["Time Series (Daily)"][last_refreshed]["4. close"]
    # return {"stockdata": {"last_refreshed": last_refreshed, "close_price": close_price}}
    return "hello"



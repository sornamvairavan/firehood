import os
from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Stock, db
import finnhub
from time import time

FIN_KEY = os.environ.get("FIN_KEY")
FIN_KEY2 = os.environ.get("FIN_KEY2")

finnhub_client = finnhub.Client(api_key="c87esuiad3i9lkntmdcg")
finnhub2_client = finnhub.Client(api_key="c87ggciad3i9lkntnqd0")

def get_price(ticker):
    try:
        data = finnhub_client.quote(ticker)
        price = data["pc"]
        time = data["t"]
    except:
        data = finnhub2_client.quote(ticker)
        price = data["pc"]
        time = data["t"]
    return [price, time]
    
def more_than_oneday(stock):
    epoch_time = time()
    difference = epoch_time - float(stock.last_updated)
    if difference > 86400:
        result = get_price(stock.ticker_symbol)
        stock.price = result[0]
        stock.last_updated = result[1]
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





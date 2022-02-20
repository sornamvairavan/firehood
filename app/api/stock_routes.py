import os
from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Stock
import finnhub

FIN_KEY = os.environ.get("FIN_KEY")
FIN_KEY2 = os.environ.get("FIN_KEY2")

finnhub_client = finnhub.Client(api_key="c87esuiad3i9lkntmdcg")
finnhub2_client = finnhub.Client(api_key="c87ggciad3i9lkntnqd0")

def get_price(ticker):
    try:
        result = finnhub_client.quote(ticker)
        price = result["c"]
        time = result["t"]
    except:
        result = finnhub2_client.quote(ticker)
        price = result["c"]
        time = result["t"]

    return [price, time]
    

stock_routes = Blueprint('stocks', __name__)

@stock_routes.route('/')
@login_required
def get_all_stocks():
    stocks = Stock.query.all()
    return jsonify([stock.to_dict() for stock in stocks])


@stock_routes.route('/<ticker>')
@login_required
def get_stock_detail(ticker):
    

    return "hello"



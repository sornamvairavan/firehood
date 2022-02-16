import os
from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Stock
import requests

API_KEY = os.environ.get("API_KEY")

stock_routes = Blueprint('stocks', __name__)

@stock_routes.route('/')
@login_required
def get_stocks():
    stocks = Stock.query.all()
    # return {"stocks": [stock.to_dict() for stock in stocks]}
    return "HELLO"


@stock_routes.route('/<int:id>')
# @login_required
def get_stock_detail(id):
    url = f'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey={API_KEY}'
    r = requests.get(url)
    data = r.json()

    print(data)
    return {"stock": [data]}

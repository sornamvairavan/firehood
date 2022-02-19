import os
from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Stock


FIN_KEY = os.environ.get("FIN_KEY")
FIN_KEY2 = os.environ.get("FIN_KEY2")

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



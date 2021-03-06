from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Stock, db


search_routes = Blueprint('search', __name__)


@search_routes.route('/<q>')
@login_required
def search(q):

    search_ticker = Stock.query.filter(Stock.ticker_symbol.ilike(f'%{q}%')).all()
    search_company = Stock.query.filter(Stock.company_name.ilike(f'%{q}%')).all()

    search_results = list(set(search_ticker + search_company))

    sorted_search_results = sorted(search_results, key=lambda stock: stock.id)
    
    top5 = sorted_search_results[0:5]

    return {"search": [stock.to_dict() for stock in top5]}
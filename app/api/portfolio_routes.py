from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Portfolio, db, Transaction, User
from datetime import datetime
import pytz
from app.api.stock_routes import more_than_sixhours


portfolio_routes = Blueprint('portfolios', __name__)

def not_valid_quantity(quantity):
    try:
        int(quantity)
    except ValueError:
        return True

    if int(quantity) <= 0:
        return True

def create_new_transaction(type, portfolio, user_id, stock_id):
    new_transaction = Transaction(
        type = type,
        price = portfolio["price"],
        quantity = portfolio["quantity"],
        user_id = user_id,
        stock_id = stock_id,
        created_at = datetime.now()
    )
    if (type == "Buy"):
        current_user.cash -= portfolio["cost"]
    else:
        current_user.cash += portfolio["cost"]

    db.session.add(new_transaction)
    db.session.commit()


# Get all of the user's portfolios 
@portfolio_routes.route("/")
@login_required
def get_users_portfolios():

    user_id = int(current_user.id)
    user_portfolios = Portfolio.query.filter(Portfolio.user_id == user_id).all()

    for portfolio in user_portfolios:
        result = more_than_sixhours(portfolio.stock)
        if result:
            portfolio.price = result
            db.session.commit()

    return jsonify([portfolio.to_dict() for portfolio in user_portfolios])


# Buy a stock
@portfolio_routes.route("/<int:stock_id>", methods=['POST'])
@login_required
def add_portfolio(stock_id):
    
    new_port = request.json

    if not_valid_quantity(new_port["quantity"]):
        return {"errors": ["Please enter a valid quantity"]}, 400

    if float(new_port["cost"]) > float(current_user.cash):
        return {"errors": ["You don't have sufficient cash"]}, 400

    user_id = int(current_user.id)

    user_portfolios = Portfolio.query.filter(Portfolio.user_id == user_id).all()

    for portfolio in user_portfolios:
        if portfolio.stock_id == stock_id:
            portfolio.quantity += int(new_port["quantity"])
            create_new_transaction("Buy", new_port, user_id, stock_id)
            return portfolio.to_dict()
    
    new_portfolio = Portfolio(
        price = new_port["price"],
        quantity = new_port["quantity"],
        user_id = user_id,
        stock_id = stock_id
    )

    db.session.add(new_portfolio)
    db.session.commit()

    create_new_transaction("Buy", new_port, user_id, stock_id)
    return new_portfolio.to_dict()


# Sell a stock
@portfolio_routes.route("/<int:stock_id>", methods=['PUT'])
@login_required
def update_portfolio(stock_id):

    updated_port = request.json

    if not_valid_quantity(updated_port["quantity"]):
        return {"errors": ["Please enter a valid quantity"]}, 400
 
    user_id = int(current_user.id)

    user_portfolios = Portfolio.query.filter(Portfolio.user_id == user_id).all()

    for portfolio in user_portfolios:
        
        if portfolio.stock_id == stock_id:
            if int(updated_port["quantity"]) > portfolio.quantity:
                return {"errors": ["You can only sell within the number of shares you hold"]}, 400
            else:
                portfolio.quantity -= int(updated_port["quantity"])

                create_new_transaction("Sell", updated_port, user_id, stock_id)

                updated_portfolio = Portfolio.query.get(portfolio.id)

                if updated_portfolio.quantity == 0:
                    db.session.delete(updated_portfolio)
                    db.session.commit()
                    return {"delete": portfolio.id}
                else:
                    return updated_portfolio.to_dict()

    return {"errors": ["You do not hold any of these shares to sell"]}, 400


# Portfolio value chart
@portfolio_routes.route("/chart")
@login_required
def get_portfolio_chart_details():
    user_id = int(current_user.id)

    user =  User.query.get(user_id)

    user_portfolios = Portfolio.query.filter(Portfolio.user_id == user_id).all()

    totalValue = 0
    for portfolio in user_portfolios:
        totalValue += (portfolio.stock.price * portfolio.quantity)

    user_values = user.portfolio_value

    values = []
    date_array = []

    for val in user_values:
        splitvd = val.split("+")
        values.append(splitvd[0])
        date_array.append(splitvd[1])

    today = datetime.now(pytz.timezone('US/Eastern')).strftime('%d-%b')

    if date_array[-1] != today:
        dv = f"{totalValue}+{today}"
        user.portfolio_value = user.portfolio_value + [dv]
        user.updated_at = datetime.now(pytz.timezone('US/Eastern'))
        db.session.commit()

    update = user.updated_at.strftime('%d-%b')

    if date_array[-1] == update:
        date_array.pop()
        values.pop()
        date_array.append(today)
        values.append(f"{totalValue}")

    change = "rgb(0,200,5)"

    if len(values) > 1 and values[-2] > values[-1]:
        change = "#FF5000"

    return {"values": values, "dates": date_array, "change":change}
    
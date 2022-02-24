from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Portfolio, db, Transaction, User
from datetime import datetime
import pytz
from app.api.stock_routes import more_than_halfday


portfolio_routes = Blueprint('portfolios', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# Get all of the user's portfolios 
@portfolio_routes.route("/")
@login_required
def get_users_portfolios():
    user_id = int(current_user.id)
    user_portfolios = Portfolio.query.filter(Portfolio.user_id == user_id).all()

    for portfolio in user_portfolios:
        more_than_halfday(portfolio.stock)

    return jsonify([portfolio.to_dict() for portfolio in user_portfolios])

# Buy a stock
@portfolio_routes.route("/<int:stock_id>", methods=['POST'])
@login_required
def add_portfolio(stock_id):
    
    new_port = request.json

    if int(new_port["quantity"]) <= 0:
        return {"errors": ["Please enter a valid quantity"]}, 400

    if float(new_port["cost"]) > float(current_user.cash):
        return {"errors": ["You don't have sufficient cash"]}, 400

    user_id = int(current_user.id)

    user_portfolios = Portfolio.query.filter(Portfolio.user_id == user_id).all()

    for portfolio in user_portfolios:
        if portfolio.stock_id == stock_id:
            portfolio.quantity += int(new_port["quantity"])
            new_transaction = Transaction(
                type = "Buy",
                price = portfolio.price,
                quantity = new_port["quantity"],
                user_id = user_id,
                stock_id = stock_id,
                created_at = datetime.now()
            )
            current_user.cash -= new_port["cost"]
            db.session.add(new_transaction)
            db.session.commit()
            return portfolio.to_dict()
    
    new_portfolio = Portfolio(
        price = new_port["price"],
        quantity = new_port["quantity"],
        user_id = user_id,
        stock_id = stock_id
    )
    new_transaction = Transaction(
        type = "Buy",
        price = new_port["price"],
        quantity = new_port["quantity"],
        user_id = user_id,
        stock_id = stock_id,
        created_at = datetime.now()
    )
    current_user.cash -= new_port["cost"]

    db.session.add(new_portfolio)
    db.session.add(new_transaction)
    db.session.commit()
    return new_portfolio.to_dict()


# Sell a stock
@portfolio_routes.route("/<int:stock_id>", methods=['PUT'])
@login_required
def update_portfolio(stock_id):

    updated_port = request.json

    if int(updated_port["quantity"]) <= 0:
        return {"errors": ["Please enter a valid quantity"]}, 400
 
    user_id = int(current_user.id)

    user_portfolios = Portfolio.query.filter(Portfolio.user_id == user_id).all()

    for portfolio in user_portfolios:
        
        if portfolio.stock_id == stock_id:
            if int(updated_port["quantity"]) > portfolio.quantity:
                return {"errors": ["You can only sell within the number of shares you hold"]}, 400
            else:
                portfolio.quantity -= int(updated_port["quantity"])
                new_transaction = Transaction(
                    type = "Sell",
                    price = portfolio.price,
                    quantity = updated_port["quantity"],
                    user_id = user_id,
                    stock_id = stock_id,
                    created_at = datetime.now()
                )
                current_user.cash += float(updated_port["cost"])
                db.session.add(new_transaction)
                db.session.commit()

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
        totalValue += (portfolio.price * portfolio.quantity)

    user_values = user.portfolio_value

    values = []
    date_array = []

    for val in user_values:
        splitvd = val.split("+")
        values.append(splitvd[0])
        date_array.append(splitvd[1])

    today = datetime.now(pytz.timezone('America/NewYork')).strftime('%d-%b')

    date_array.append(today)
    values.append(f"{totalValue}")
    
    if date_array[-1] != today:
        dv = f"{totalValue}+{today}"
        user.portfolio_value = user.portfolio_value + [dv]
        user.updated_at = datetime.now()
        db.session.commit()

    return {"values": values, "dates": date_array}



    
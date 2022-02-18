from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Portfolio, db


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
    return jsonify([portfolio.to_dict() for portfolio in user_portfolios])

# Buy a stock
@portfolio_routes.route("/<int:stock_id>", methods=['POST'])
@login_required
def add_portfolio(stock_id):
    
    new_port = request.json()

    user_id = int(current_user.id)

    user_portfolios = Portfolio.query.filter(Portfolio.user_id == user_id).all()

    for portfolio in user_portfolios:
        if portfolio.stock_id == stock_id:
            portfolio.quanity += int(new_port["quantity"])
            db.session.commit()
            return portfolio.to_dict()
    
    new_portfolio = Portfolio(
        purchase_price = new_port["purchase_price"],
        quantity = new_port["quantity"],
        user_id = user_id,
        stock_id = stock_id
    )

    db.session.add(new_portfolio)
    db.session.commit()
    return new_portfolio.to_dict()


# Sell a stock
@portfolio_routes.route("/<int:portfolio_id>", methods=['PUT'])
@login_required
def update_portfolio(portfolio_id):

    updated_port = request.json()

    portfolio = Portfolio.query.get(portfolio_id)

    if int(updated_port["quantity"]) > portfolio.quantity:
        return {"errors": "You can only sell within the number of shares you own"}, 400
    portfolio.quantity -= int(updated_port["quantity"])
    db.session.commit()

    updated_portfolio = Portfolio.query.get(portfolio_id)

    if updated_portfolio.quantity == 0:
        db.session.delete(updated_portfolio)
        db.session.commit()
        return "Delete successful"

    return updated_portfolio.to_dict()


    
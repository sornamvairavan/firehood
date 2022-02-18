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


from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Transaction


transaction_routes = Blueprint('transactions', __name__)


# Get all of the user's transactions
@transaction_routes.route("/")
@login_required
def get_users_transactions():
    user_id = int(current_user.id)
    user_transactions = Transaction.query.filter(Transaction.user_id == user_id).all()
    return jsonify([transaction.to_dict() for transaction in user_transactions])
from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Watchlist

watchlist_routes = Blueprint('watchlists', __name__)

@watchlist_routes.route("/<int:user_id>")
@login_required
def get_users_watchlist(user_id):
    user_watchlists = Watchlist.query.filter(Watchlist.user_id == user_id).all()
    return {"watchlists": [watchlist.to_dict() for watchlist in user_watchlists]}

@watchlist_routes.route("/", methods=['POST'])
@login_required
def add_watchlist(user_id):
    return "Hey"  
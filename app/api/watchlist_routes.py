from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Watchlist, db, Stock
from app.forms import WatchlistForm


watchlist_routes = Blueprint('watchlists', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


# Get all of the user's watchlists 
@watchlist_routes.route("/")
@login_required
def get_users_watchlist():
    user_id = int(current_user.id)
    user_watchlists = Watchlist.query.filter(Watchlist.user_id == user_id).all()
    return jsonify([watchlist.to_dict() for watchlist in user_watchlists])


# Add a list to the watchlists
@watchlist_routes.route("/", methods=['POST'])
@login_required
def add_watchlist():
    form = WatchlistForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_watchlist = Watchlist(
            user_id = int(current_user.id),
            name = form.data['name']
            )
        db.session.add(new_watchlist)
        db.session.commit()
        return new_watchlist.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400



# Add a stock to a list
@watchlist_routes.route("/add_stock/<int:watchlist_id>", methods=['PUT'])
@login_required
def add_stock_to_list(watchlist_id):
    stock_id = int(request.json['stockId'])
    watchlist = Watchlist.query.filter(Watchlist.id == watchlist_id).first()
    for stock in watchlist.stocks:
        if (stock.id == stock_id):
            return {"errors": ["Stock already in the list"]}, 400
    
    stock = Stock.query.filter(Stock.id == stock_id).first()

    watchlist.stocks.append(stock)
    db.session.commit()

    return watchlist.to_dict()


# Remove a stock to a list
@watchlist_routes.route("/remove_stock/<int:watchlist_id>", methods=['PUT'])
@login_required
def remove_stock_from_list(watchlist_id):
    stock_id = int(request.json['stockId'])
    watchlist = Watchlist.query.filter(Watchlist.id == watchlist_id).first()
    for stock in watchlist.stocks:
        if (stock.id == stock_id):
            watchlist.stocks.remove(stock)
            db.session.commit()
    
    return watchlist.to_dict()


# Edit the name of a list
@watchlist_routes.route("/<int:id>", methods=['PUT'])
@login_required
def edit_watchlist(id):
    watchlist = Watchlist.query.get(id)
    form = WatchlistForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        watchlist.name = form.data['name']
        db.session.commit()
        return watchlist.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# Delete a list
@watchlist_routes.route("/<int:id>", methods=['DELETE'])
@login_required
def delete_watchlist(id):
    watchlist = Watchlist.query.get(id)

    if int(current_user.id) == watchlist.user_id:
        db.session.delete(watchlist)
        db.session.commit()
        return "Delete successful"
    return 400
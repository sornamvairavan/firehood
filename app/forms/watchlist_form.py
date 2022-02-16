from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Watchlist


def watchlist_exists(form, field):
    # Checking if watchlist name already exists
    name = field.data
    watchlist = Watchlist.query.filter(Watchlist.name == name).first()
    if watchlist:
        raise ValidationError('Watchlist name already exists.')

class WatchlistForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), watchlist_exists])
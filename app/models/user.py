from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy import func
from sqlalchemy.types import ARRAY


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(50), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    cash = db.Column(db.Float, nullable=False)
    portfolio_value = db.Column(ARRAY(item_type=db.String))
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = (db.Column(db.DateTime))

    portfolio = db.relationship("Portfolio", back_populates="user")
    transaction = db.relationship("Transaction", back_populates="user")
    watchlist = db.relationship("Watchlist", back_populates="user")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'fullname': self.full_name,
            'username': self.username,
            'email': self.email,
            'float_cash': self.cash,
            'cash': "${:,.2f}".format(self.cash),
            'join': self.created_at.strftime("%Y"),
            'portfolio_value': self.portfolio_value
        }

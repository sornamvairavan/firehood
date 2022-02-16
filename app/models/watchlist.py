from .db import db
from sqlalchemy import func


watchlists_stocks = db.Table(
    "watchlist_stock",
    db.Column("watchlist_id", db.Integer, db.ForeignKey("watchlists.id"), primary_key=True),
    db.Column("stock_id", db.Integer, db.ForeignKey("stocks.id"), primary_key=True)
)

class Watchlist(db.Model):
    __tablename__ = 'watchlists'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    user = db.relationship("User", back_populates="watchlist")
    stocks = db.relationship("Stock", back_populates="watchlists", secondary=watchlists_stocks)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'user_id': self.user_id,
            'created_at': self.created_at,
            'stocks': [stock.to_dict() for stock in self.stocks]
        }

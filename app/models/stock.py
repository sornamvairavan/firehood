from .db import db
from .watchlist import watchlists_stocks


class Stock(db.Model):
    __tablename__ = 'stocks'

    id = db.Column(db.Integer, primary_key=True)
    company_name = db.Column(db.String(50), nullable=False)
    ticker_symbol = db.Column(db.String(20), nullable=False)
    # price = db.Column(db.Float)

    portfolio = db.relationship("Portfolio", back_populates="stock")
    transaction = db.relationship("Transaction", back_populates="stock")
    watchlists = db.relationship("Watchlist", back_populates="stocks", secondary=watchlists_stocks)

    def to_dict(self):
        return {
            'id': self.id,
            'company_name': self.company_name,
            'ticker': self.ticker_symbol,
            # 'price': self.price
        }
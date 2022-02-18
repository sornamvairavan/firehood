import os
from .db import db
from .watchlist import watchlists_stocks
import finnhub


FIN_KEY = os.environ.get("FIN_KEY")
FIN_KEY2 = os.environ.get("FIN_KEY2")
finnhub_client = finnhub.Client(api_key={FIN_KEY})
finnhub2_client = finnhub.Client(api_key={FIN_KEY2})

def get_price(ticker):
    try:
        price = finnhub_client.quote(ticker)["c"]
    except:
        price = finnhub2_client.quote(ticker)["c"]
    return float(price)

class Stock(db.Model):
    __tablename__ = 'stocks'

    id = db.Column(db.Integer, primary_key=True)
    company_name = db.Column(db.String(255), nullable=False)
    ticker_symbol = db.Column(db.String(20), nullable=False)
    price = db.Column(db.Float)

    portfolio = db.relationship("Portfolio", back_populates="stock")
    transaction = db.relationship("Transaction", back_populates="stock")
    watchlists = db.relationship("Watchlist", back_populates="stocks", secondary=watchlists_stocks)

    def to_dict(self): 
        # if not self.price:
        #    self.price = get_price(self.ticker_symbol)

        return {
            'id': self.id,
            'company_name': self.company_name,
            'ticker': self.ticker_symbol,
            'price': self.price
        }
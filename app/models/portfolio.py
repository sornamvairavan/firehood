from .db import db
from sqlalchemy import func

class Portfolio(db.Model):
    __tablename__ = 'portfolios'

    id = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.Float, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    stock_id = db.Column(db.Integer, db.ForeignKey("stocks.id"), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    user = db.relationship("User", back_populates="portfolio")
    stock = db.relationship("Stock", back_populates="portfolio")

    def to_dict(self):
        return {
            'id': self.id,
            'price': "{:,.2f}".format(self.price),
            'quantity': self.quantity,
            'user_id': self.user_id,
            'stock_id': self.stock_id,
            'created_at': self.created_at,
            'stock': self.stock.to_dict()
        }

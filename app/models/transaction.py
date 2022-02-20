from .db import db
from sqlalchemy import func


class Transaction(db.Model):
    __tablename__ = 'transactions'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(5), nullable=False)
    price = db.Column(db.Float, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    stock_id = db.Column(db.Integer, db.ForeignKey("stocks.id"), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    user = db.relationship("User", back_populates="transaction")
    stock = db.relationship("Stock", back_populates="transaction")

    def to_dict(self):
        return {
            'id': self.id,
            'type': self.type,
            'int_price': self.price,
            'price': "${:,.2f}".format(self.price),
            'quantity': self.quantity,
            'user_id': self.user_id,
            'stock_id': self.stock_id,
            'created_at': self.created_at.strftime("%d %b, %Y"),
            'stock': self.stock.to_dict()
        }

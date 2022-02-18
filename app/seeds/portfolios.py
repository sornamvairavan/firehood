from app.models import db, Portfolio

def seed_portfolios():
    demo_p1 = Portfolio(
        purchase_price=386.67,  quantity=5, user_id=1, stock_id=68)
    demo_p2 = Portfolio(
        purchase_price=207.71,  quantity=10, user_id=1, stock_id=39)

    db.session.add(demo_p1)
    db.session.add(demo_p2)

    db.session.commit()


def undo_portfolios():
    db.session.execute('TRUNCATE portfolios RESTART IDENTITY CASCADE;')
    db.session.commit()
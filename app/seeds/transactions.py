from app.models import db, Transaction

def seed_transactions():
    demo_t1 = Transaction(
        type="Buy", price=386.67,  quantity=5, user_id=1, stock_id=68)
    demo_t2 = Transaction(
        type="Buy", price=207.71,  quantity=10, user_id=1, stock_id=39)

    db.session.add(demo_t1)
    db.session.add(demo_t2)

    db.session.commit()


def undo_transactions():
    db.session.execute('TRUNCATE transactions RESTART IDENTITY CASCADE;')
    db.session.commit()
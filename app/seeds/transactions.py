from app.models import db, Transaction

def seed_transactions():
    demo_t1  = Transaction(
        type="Buy", price=187.61,  quantity=5, user_id=1, stock_id=190, created_at="2022-03-14 08:13:37.516563-08")
    demo_t2 = Transaction(
        type="Buy", price=331.01,  quantity=3, user_id=1, stock_id=329, created_at="2022-03-15 08:13:37.516563-08")
    demo_t3 = Transaction(
        type="Buy", price=343.75,  quantity=2, user_id=1, stock_id=329, created_at="2022-03-16 08:13:37.516563-08")
    demo_t4 = Transaction(
        type="Buy", price=203.63,  quantity=5, user_id=1, stock_id=190, created_at="2022-03-17 08:13:37.516563-08")

    db.session.add(demo_t1)
    db.session.add(demo_t2)
    db.session.add(demo_t3)
    db.session.add(demo_t4)

    db.session.commit()


def undo_transactions():
    db.session.execute('TRUNCATE transactions RESTART IDENTITY CASCADE;')
    db.session.commit()
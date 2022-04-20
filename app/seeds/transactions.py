from app.models import db, Transaction

def seed_transactions():
    demo_t1  = Transaction(
        type="Buy", price=350.43,  quantity=2, user_id=1, stock_id=329, created_at="2022-04-13 08:13:37.516563-08")
    demo_t2 = Transaction(
        type="Buy", price=210.18,  quantity=5, user_id=1, stock_id=190, created_at="2022-04-14 08:13:37.516563-08")
    demo_t3 = Transaction(
        type="Buy", price=210.77,  quantity=5, user_id=1, stock_id=190, created_at="2022-04-18 08:13:37.516563-08")
    demo_t4 = Transaction(
        type="Buy", price=226.19,  quantity=3, user_id=1, stock_id=329, created_at="2022-04-20 08:13:37.516563-08")

    db.session.add(demo_t1)
    db.session.add(demo_t2)
    db.session.add(demo_t3)
    db.session.add(demo_t4)

    db.session.commit()


def undo_transactions():
    db.session.execute('TRUNCATE transactions RESTART IDENTITY CASCADE;')
    db.session.commit()
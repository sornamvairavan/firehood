from app.models import db, Transaction

def seed_transactions():
    demo_t1  = Transaction(
        type="Buy", price=221.00,  quantity=5, user_id=1, stock_id=39, created_at="2022-02-16 08:13:37.516563-08")
    demo_t2 = Transaction(
        type="Buy", price=398.08,  quantity=3, user_id=1, stock_id=68, created_at="2022-02-17 08:13:37.516563-08")
    demo_t3 = Transaction(
        type="Buy", price=386.67,  quantity=2, user_id=1, stock_id=68, created_at="2022-02-18 08:13:37.516563-08")
    demo_t4 = Transaction(
        type="Buy", price=206.16,  quantity=5, user_id=1, stock_id=39, created_at="2022-02-22 08:13:37.516563-08")

    db.session.add(demo_t1)
    db.session.add(demo_t2)
    db.session.add(demo_t3)
    db.session.add(demo_t4)

    db.session.commit()


def undo_transactions():
    db.session.execute('TRUNCATE transactions RESTART IDENTITY CASCADE;')
    db.session.commit()
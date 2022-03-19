from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        full_name='Demo', username='Demo', email='demo@aa.io', password='password', cash=1363.73, 
        portfolio_value=["938.05+14-Mar", "1931.08+15-Mar", "2618.58+16-Mar", "3636.73+17-Mar"], 
        updated_at="2022-02-23 08:13:37.516563-08")
    eduardo = User(
        full_name='Eduardo A', username='eduardo', email='eduardo@aa.io', password='password', cash=5000,
        portfolio_value=["0+22-Feb"], updated_at = "2022-02-22 08:13:37.516563-08")
    bobbie = User(
        full_name='Bob T', username='bobbie', email='bobbie@aa.io', password='password', cash=5000,
        portfolio_value=["0+22-Feb"], updated_at="2022-02-22 08:13:37.516563-08")

    db.session.add(demo)
    db.session.add(eduardo)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()

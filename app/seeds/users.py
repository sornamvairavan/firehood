from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        full_name='Demo', username='Demo', email='demo@aa.io', password='password', cash=5000, 
        portfolio_value=["1082.70+16-Feb", "2242.71+17-Feb", "3026.05+18-Feb", "2956.08+21-Feb", "3800.02+22-Feb"])
    eduardo = User(
        full_name='Eduardo A', username='eduardo', email='eduardo@aa.io', password='password', cash=5000)
    bobbie = User(
        full_name='Bob T', username='bobbie', email='bobbie@aa.io', password='password', cash=5000)

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

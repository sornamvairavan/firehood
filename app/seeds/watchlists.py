from app.models import db, Watchlist

def seed_watchlists():
    demo_wl1 = Watchlist(name="My Top stocks", user_id=1)
    demo_wl2 = Watchlist(name="Tech", user_id=1)
    demo_wl3 = Watchlist(name="Finance", user_id=1)
    eduardo_wl = Watchlist(name="My Top stocks", user_id=2)
    bobbie_wl = Watchlist(name="Health Care", user_id=3)

    db.session.add(demo_wl1)
    db.session.add(demo_wl2)
    db.session.add(demo_wl3)
    db.session.add(eduardo_wl)
    db.session.add(bobbie_wl)

    db.session.commit()


def undo_watchlists():
    db.session.execute('TRUNCATE watchlists RESTART IDENTITY CASCADE;')
    db.session.commit()
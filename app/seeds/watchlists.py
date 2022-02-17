from app.models import db, Watchlist, Stock

def seed_watchlists():
    demo_wl1 = Watchlist(name="My Top stocks", user_id=1)
    demo_wl2 = Watchlist(name="Tech", user_id=1)
    demo_wl3 = Watchlist(name="Auto", user_id=1)
    eduardo_wl = Watchlist(name="My Top stocks", user_id=2)
    bobbie_wl = Watchlist(name="Health Care", user_id=3)

    apple = Stock.query.get(1)
    amazon = Stock.query.get(12)
    google = Stock.query.get(44)
    fb = Stock.query.get(39)
    microsoft = Stock.query.get(65)
    netflix = Stock.query.get(68)
    tesla = Stock.query.get(92)

    demo_wl1.append(apple)
    demo_wl1.append(amazon)
    demo_wl1.append(netflix)

    demo_wl2.append(google)
    demo_wl2.append(fb)
    demo_wl2.append(microsoft)

    demo_wl2.append(tesla)

    db.session.add(demo_wl1)
    db.session.add(demo_wl2)
    db.session.add(demo_wl3)
    db.session.add(eduardo_wl)
    db.session.add(bobbie_wl)

    db.session.commit()


def undo_watchlists():
    db.session.execute('TRUNCATE watchlists RESTART IDENTITY CASCADE;')
    db.session.commit()
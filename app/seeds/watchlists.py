from app.models import db, Watchlist, Stock

def seed_watchlists():
    demo_wl1 = Watchlist(name="My Top Stocks", user_id=1)
    demo_wl2 = Watchlist(name="Tech", user_id=1)
    demo_wl3 = Watchlist(name="Auto", user_id=1)
    eduardo_wl = Watchlist(name="My Top stocks", user_id=2)
    bobbie_wl = Watchlist(name="Health Care", user_id=3)

    apple = Stock.query.get(46)
    amazon = Stock.query.get(27)
    google = Stock.query.get(24)
    fb = Stock.query.get(190)
    microsoft = Stock.query.get(315)
    netflix = Stock.query.get(329)
    tesla = Stock.query.get(437)

    demo_wl1.stocks.append(apple)
    demo_wl1.stocks.append(amazon)
    demo_wl1.stocks.append(netflix)

    demo_wl2.stocks.append(google)
    demo_wl2.stocks.append(fb)
    demo_wl2.stocks.append(microsoft)

    demo_wl3.stocks.append(tesla)

    db.session.add(demo_wl1)
    db.session.add(demo_wl2)
    db.session.add(demo_wl3)
    db.session.add(eduardo_wl)
    db.session.add(bobbie_wl)

    db.session.commit()


def undo_watchlists():
    db.session.execute('TRUNCATE watchlists RESTART IDENTITY CASCADE;')
    db.session.commit()
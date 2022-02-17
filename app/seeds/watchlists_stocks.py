# from app.models import db, watchlists_stocks


# def seed_watchlists_stocks():
#     demo_ws1 = watchlists_stocks(watchlist_id=1, stock_id=1)
#     demo_ws2 = watchlists_stocks(watchlist_id=1, stock_id=2)
#     demo_ws3 = watchlists_stocks(watchlist_id=1, stock_id=3)

#     db.session.add(demo_ws1)
#     db.session.add(demo_ws2)
#     db.session.add(demo_ws3)
#     db.session.commit()


# def undo_watchlists_stocks():
#     db.session.execute('TRUNCATE watchlist_stock RESTART IDENTITY CASCADE;')
#     db.session.commit()
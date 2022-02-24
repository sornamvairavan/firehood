## Overview
[Firehood](https://firehood.herokuapp.com/), your way to "Financial Independence, Retire Early", is a [Robinhood](https://robinhood.com/us/en/) clone, which allows users to buy and sell NASDAQ-100 stocks with fake money. Firehood provides you a way to achieve FIRE, and live happily ever after.

## Application Architecture
Firehood is built on a React frontend with a Flask backend, using PostgreSQL as a database. Firehood relies on Yahoo Finance API and Finnhub API to get the latest stock market prices and Plotly charts for rendering historical charts. 

## Technologies used
**Frontend**
- React
- Redux
- JavaScript
- HTML
- CSS

**Backend**
- Flask
- Python
- PostgreSQL
- SQLAlchemy

**Stock Data API**
- Yahoo Finance API
- Finnhub API

## Firehood setup
1. Clone this repository (*https://github.com/sornamvairavan/firehood.git*)
2. Install dependencies - `pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt`
3. Create a `.env` file based on the **.env.example** with proper settings required for the development environment
4. Setup PostgreSQL user, password and database and to make sure it matches the **.env** file
5. Get into pipenv, migrate the database, seed the database, and run the flask app using the following commands:
   * `pipenv shell`
   * `flask db upgrade`
   * `flask seed all`
   * `flask run`
6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

## Features
### Portfolio and Watchlists
Users can view their portfolio chart when logged in that shows the movement of the stocks in their portfolio. Users can also create a list in their watchlist and add stocks that they want to keep track of to the list.
![Portfolio and Watchlists](https://res.cloudinary.com/dikzc7kwd/image/upload/v1645664743/Screen_Shot_2022-02-23_at_5.05.34_PM_cpfbyl.png)

### Stock Detail
Users can view the historical chart, buy and sell that stock from the stock detail page.
![Stock Detail](https://res.cloudinary.com/dikzc7kwd/image/upload/v1645664889/Screen_Shot_2022-02-23_at_5.07.59_PM_a7lrcb.png)

### Transactions
Users' transaction table would be updated with their every buy and sell.
![Transactions](https://res.cloudinary.com/dikzc7kwd/image/upload/v1645664956/Screen_Shot_2022-02-23_at_5.09.07_PM_mjgiyv.png)

### Search
Users will be able to search for stocks based on the company name or ticker. The search bar drops suggestions for the at least five companies that the user may be searching for.
![Search](https://res.cloudinary.com/dikzc7kwd/image/upload/v1645665056/Screen_Shot_2022-02-23_at_5.10.46_PM_pc4tx1.png)

## Link to Wiki docs
*https://github.com/sornamvairavan/firehood/wiki*

## Next steps
- News feature


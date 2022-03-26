## Overview
[Firehood](https://firehood.herokuapp.com/), your way to "Financial Independence, Retire Early", is a [Robinhood](https://robinhood.com/us/en/) clone, which allows users to buy and sell S&P500 stocks with fake money. Firehood provides you a way to achieve FIRE, and live happily ever after.

## Application Architecture
Firehood is built on a React frontend with a Flask backend, using PostgreSQL as a database. Firehood relies on Yahoo Finance API and Finnhub API to get the latest stock market prices and news and Plotly charts for rendering historical charts. 

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

**Stock and News Data API**
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
![Portfolio and Watchlists](https://res.cloudinary.com/dikzc7kwd/image/upload/v1645727971/Screen_Shot_2022-02-24_at_10.39.15_AM_qioaeg.png)

### Stock Detail
Users can view the historical chart, buy and sell that stock from the stock detail page.
![Stock Detail](https://res.cloudinary.com/dikzc7kwd/image/upload/v1645728053/Screen_Shot_2022-02-24_at_10.40.41_AM_ljigmv.png)

### Transactions
Users' transaction table would be updated with their every buy and sell.
![Transactions](https://res.cloudinary.com/dikzc7kwd/image/upload/v1645728096/Screen_Shot_2022-02-24_at_10.41.25_AM_ncheib.png)

### Search
Users will be able to search for stocks based on the company name or ticker. The search bar drops suggestions for the at least five companies that the user may be searching for.
![Search](https://res.cloudinary.com/dikzc7kwd/image/upload/v1645728144/Screen_Shot_2022-02-24_at_10.42.13_AM_ecm4fd.png)

### News
Users can view the latest current news from the Portfolio page.
![News](https://res.cloudinary.com/dikzc7kwd/image/upload/v1648317108/Screen_Shot_2022-03-26_at_10.51.38_AM_w6isrd.png)

## Link to Wiki docs
*https://github.com/sornamvairavan/firehood/wiki*


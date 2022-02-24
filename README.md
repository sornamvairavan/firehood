## Overview
[Firehood](https://firehood.herokuapp.com/), your way to "Financial Independence, Retire Early", is a Robinhood(https://robinhood.com/us/en/) clone, which allows users to buy and sell NASDAQ-100 stocks with fake money.

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
3. Create a **.env** file based on the .env.example with proper settings required for the development environment
4. Setup PostgreSQL user, password and database and to make sure it matches the **.env** file
5. Get into pipenv, migrate the database, seed the database, and run the flask app using the following commands:
   * `pipenv shell`
   * `flask db upgrade`
   * `flask seed all`
   * `flask run`
6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

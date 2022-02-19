import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import SplashPage from './components/SplashPage';
import Portfolio from './components/Portfolio';
import { authenticate } from './store/session';
import Stocks from './components/Stock';
import Transaction from './components/Transactions';
import PageNotFound from './components/PageNotFound';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/" exact={true}>
          {user ? <Portfolio /> : <SplashPage />}
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/stocks/:ticker' exact={true}>
          <Stocks />
        </ProtectedRoute>
        <ProtectedRoute path='/transactions' exact={true}>
          <Transaction />
        </ProtectedRoute>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

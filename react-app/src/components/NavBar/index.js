import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { login } from '../../store/session';
import homelogo from '../../images/firehood-logo.png'
import './NavBar.css'


const NavBar = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)

  const demoLogin = e => {
    return dispatch(login("demo@aa.io", "password"))
  }
  let sessionLinks;

  if (user) {
    sessionLinks = (
      <>
        <NavLink to="/" className="nav-tabs" exact>Portfolio</NavLink>
        <NavLink to="/transactions" className="nav-tabs">Transactions</NavLink>
        <span>Welcome {user.fullname}! </span>
        <LogoutButton />
      </>
    )
  } else {
    sessionLinks = (
      <>
        <Link onClick={demoLogin} to="#" id="demo-button">Demo</Link>
        <NavLink to="/login" id="login-button">Login</NavLink>
        <NavLink to="/sign-up" id='signup-button'>Sign Up</NavLink>
      </>
    )
  }
  return (
    <div className="nav-bar">
        <span className="left-nav-bar">
          <NavLink to='/' exact={true} >
            <img src={homelogo} alt="home" className="logo-img"/>
          </NavLink>
        </span>
        <span className="right-nav-bar">
          {sessionLinks}
        </span>
    </div>
  );
}

export default NavBar;

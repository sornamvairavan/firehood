import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { login } from '../../store/session';
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
        <LogoutButton />
      </>
    )
  } else {
    sessionLinks = (
      <>
        <Link onClick={demoLogin} to="#" id="demo-button">Demo</Link>
        <NavLink to="/login" activeClassName='active' id="login-button">Login</NavLink>
        <NavLink to="/sign-up" activeClassName='active' id='signup-button'>Sign Up</NavLink>
      </>
    )
  }
  return (
    <div className="nav-bar">
        <span className="left-nav-bar">
          <NavLink to='/' exact={true} >
            <img src="/images/firehood.png" alt="home" className="logo-img"/>
          </NavLink>
        </span>
        <span className="right-nav-bar">
          {sessionLinks}
        </span>
    </div>
  );
}

export default NavBar;

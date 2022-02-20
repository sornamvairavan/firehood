import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import homelogo from '../../images/firehood-logo.png'
import './NavBar.css'

const NavBar = () => {
  const user = useSelector(state => state.session.user)

  let sessionLinks;

  if (user) {
    sessionLinks = (
      <>
        <span className="nav-cash">Cash Balance: {user?.cash}</span>
        <NavLink to="/" className="nav-tabs" exact>Portfolio</NavLink>
        <NavLink to="/transactions" className="nav-tabs">Transactions</NavLink>
        <span>Welcome {user.fullname}! </span>
        <LogoutButton />
      </>
    )
  } else {
    sessionLinks = (
      <>
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

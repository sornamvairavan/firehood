import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import logo from '../../images/logo.png'
import './SplashPage.css'

export default function SplashPage() {

  const user = useSelector(state => state.session.user);

  if (user) {
    return <Redirect to='/' />;
  }

    return (
      <div className='container'>
        <div className="splash-container">
          <div className="splash-text-container">
            <h2 className="header1">Investing for Everyone</h2>
            <div>
              <h3 className="one-liner">Your way to Financial Independence, Retire Early (FIRE)</h3>
              <h3 className="one-liner">Commission-free investing, plus the tools you need to put your money in motion.</h3>
            </div>
            <div className="signup-cont">
              <Link to="/signup" className='splash-signup'>Sign up</Link>
            </div>
          </div>
          <div className='logo'>
            <img src={logo} alt="logo" className="splash-logo"/>
          </div>
        </div>
          <footer className='network-links'>
            <div>Sornam Vairavan</div>
            <a href="https://www.linkedin.com/in/sornamvairavan" target="_blank" rel="noreferrer">
              <i className="fab fa-linkedin fa-lg"></i>
            </a>
            <a href="https://github.com/sornamvairavan" target="_blank" rel="noreferrer">
              <i className="fab fa-github fa-lg"></i>
            </a>
          </footer>
      </div>
    )
  }
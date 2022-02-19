import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import logo from '../../images/logo.png'
import './SplashPage.css'

export default function SplashPage() {

  const user = useSelector(state => state.session.user);

  if (user) {
    return <Redirect to='/' />;
  }

    return (
      <div className="splash-container">
        <div className='logo'>
          <img src={logo} alt="logo" className="splash-logo"/>
        </div>
        <div className="splash-text-container">
          <h2 className="header1">Investing for Everyone</h2>
          <h5 className="one-liner">Your way to Financial Independence, Retire Early (FIRE)</h5>
          <h5 className="one-liner">Commission-free investing, plus the tools you need to put your money in motion.</h5>

        </div>
        {/* <footer className='network-links'>
          <div>Sornam Vairavan</div>
          <a href="https://www.linkedin.com/in/sornamvairavan" target="_blank" rel="noreferrer">
            <i className="fab fa-linkedin fa-lg"></i>
          </a>
          <a href="https://github.com/sornamvairavan" target="_blank" rel="noreferrer">
            <i className="fab fa-github fa-lg"></i>
          </a>
        </footer> */}
      </div>
    )
  }
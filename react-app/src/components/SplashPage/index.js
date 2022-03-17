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
              <h3 className="one-liner">Explore your path to Financial Independence, Retire Early (FIRE) today!</h3>
              <h3 className="one-liner">Commission-free investing, plus the tools you need to put your Firehood money in motion.</h3>
            </div>
            <div className="signup-cont">
              <Link to="/sign-up" className='splash-signup'>Sign up</Link>
            </div>
          </div>
          <div className='logo'>
            <img src={logo} alt="logo" className="splash-logo"/>
          </div>
        </div>
          <footer className='network-links'>
            <div className='tech'>
              <div>React</div>
              <div>Redux</div>
              <div>JavaScript</div>
              <div>Python</div>
              <div>Flask</div>
              <div>PostgreSQL</div>
            </div>
            <div>Sornam Vairavan</div>
            <a href="https://www.linkedin.com/in/sornamvairavan" target="_blank" rel="noreferrer">
              <i className="fab fa-linkedin fa-lg" title="LinkedIn"></i>
            </a>
            <a href="https://github.com/sornamvairavan" target="_blank" rel="noreferrer">
              <i className="fab fa-github fa-lg" title="GitHub"></i>
            </a>
            <div>
            <a href="https://github.com/sornamvairavan/firehood" target="_blank" rel="noreferrer">
            <i className="fa-solid fa-folder-open" title="GitHub Repo"></i>
            </a>
            </div>
          </footer>
      </div>
    )
  }
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import { signUp, login } from '../../store/session';
import logo from '../../images/logo.png'
import './AuthForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [fullname, setFullname] = useState('')
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const demoLogin = e => {
    e.preventDefault()
    return dispatch(login("demo@aa.io", "password"))
  }

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(fullname, username, email, password));
      if (data) {
        setErrors(data)
      } 
    } else {
      setErrors(['Passwords do not match'])
    }
  };

  const updateFullname = (e) => {
    setFullname(e.target.value);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="auth-container">
      <div className='auth-form-container sign-up-cont'>
        <form onSubmit={onSignUp} className="auth-form">
        <h1 className="form-title">Sign up for Firehood</h1>
        <img src={logo} alt="logo" className="auth-logo"/>
          <div>
            {errors.length > 0 && <ul className="errors">
              {errors.map((error, idx) => <li key={idx}>{error}</li>)}
              </ul>}
          </div>
          <div className='input-container'>
            <label>Name</label>
            <input
              type='text'
              name='fullname'
              autoComplete='off'
              onChange={updateFullname}
              value={fullname}
              required={true}
            ></input>
            <label>Username</label>
            <input
              type='text'
              name='username'
              autoComplete='off'
              onChange={updateUsername}
              value={username}
              required={true}
            ></input>
            <label>Email</label>
            <input
              type='text'
              name='email'
              autoComplete='off'
              onChange={updateEmail}
              value={email}
              required={true}
            ></input>
            <label>Password</label>
            <input
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
              required={true}
            ></input>
            <label>Repeat Password</label>
            <input
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
            <button type='submit' className="auth-button">Sign Up</button>
            <button onClick={demoLogin} to="#" id="demo-button">Demo</button>
            <p>Already have an account? <Link to="/login">Login here.</Link></p>
          </div>
        </form>
      </div>
      <div className="signup-content-container">
        <div>
          <h2>Make Your Money Move</h2>
          <p className="signup-content">Firehood lets you invest in companies you love, commission-free to achieve FIRE and live happily ever after.</p>
        </div>
        <div>
          <div className="signup-heading">Commission-free trading</div>
          <div className="signup-content">Practice virtual trading to sharpen your knowledge of how the stock market works with our sign up bonus of $5,000, and make commission-free trades in stocks with Firehood. </div>
        </div>
        <div>
          <div className="signup-heading">Prepare yourself to trade</div>
          <div className="signup-content">Firehood provides the tools you need to prepare yourself to start investing in stocks without risking real money.</div>
        </div>
        <div>
          <div className="signup-heading">Stay on top of the stocks</div>
          <div className="signup-content">Stay up to date with the news and set up customized watchlists to stay on top of the stocks as casually or as relentlessly as you like. Controlling the flow of info is up to you.</div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;

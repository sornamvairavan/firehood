import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import logo from '../../images/logo.png'
import robinlogin from '../../images/robinhood-login-image.jpeg'
import './AuthForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();


  const demoLogin = e => {
    e.preventDefault()
    return dispatch(login("demo@aa.io", "password"))
  }

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="auth-container">
      <div className="login-image">
        <img src={robinlogin} alt="Logo" className="robin-image" />
      </div>
      <div className='auth-form-container'>
        <form onSubmit={onLogin} className="auth-form">
        <h1 className="form-title">Login to Firehood</h1>
        <img src={logo} alt="logo" className="auth-logo"/>
          <div>
          {errors.length > 0 && <ul className="errors">
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>}
          </div>
          <div className='input-container'>
            <label htmlFor='email'>Email</label>
            <input
              name='email'
              type='text'
              autoComplete='off'
              value={email}
              onChange={updateEmail}
              required={true}
            />
            <label htmlFor='password'>Password</label>
            <input
              name='password'
              type='password'
              value={password}
              onChange={updatePassword}
              required={true}
            />
            <button type='submit' className="auth-button">Login</button>
            <button onClick={demoLogin} to="#" id="demo-button">Demo</button>
            <p>Don't have an account? <Link to="/sign-up">Sign up here.</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

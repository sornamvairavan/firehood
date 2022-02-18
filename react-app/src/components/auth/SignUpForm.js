import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
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
    <div className='auth-form-container'>
      <form onSubmit={onSignUp} className="auth-form">
      <h1 className="form-title">Sign up for Firehood</h1>
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
            onChange={updateFullname}
            value={fullname}
          ></input>
          <label>Username</label>
          <input
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
          ></input>
          <label>Email</label>
          <input
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
          ></input>
          <label>Password</label>
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
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
          <p>Already have an account? <Link to="/login">Login here.</Link></p>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;

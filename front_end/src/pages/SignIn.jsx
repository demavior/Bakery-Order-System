import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCheckLogin } from '../utils/useCheckLogin';
import axios from 'axios';
axios.defaults.withCredentials = true;

function SignIn() {

  const navigate = useNavigate();
  const { isLoggedIn} = useCheckLogin();

  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      if (isLoggedIn) {
        console.log('Already logged in');
      }
      else{
        const response = await axios.post('/backend/user/login/', loginData);
        console.log('Logged in successfully:', response.data);
      }
      navigate('/user')
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <main>
        <h2>Sign In</h2>
        <form onSubmit={handleSignIn}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              value={loginData.username}
              onChange={handleChange}
              placeholder="Username"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
          <button type="submit">Sign In</button>
        </form>
        <Link to="/register">
          <button className='Navigation'>Register</button>
        </Link>
      </main>
    </div>
  );
}

export default SignIn;
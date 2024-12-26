import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import axios from 'axios';
axios.defaults.withCredentials = true;

function SignIn() {

  const navigate = useNavigate();
  const { username, setUsername} = useAuth();

  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      // Logout if there is a user already logged in
      if (username) {
        const response = await axios.get('/backend/user/logout/');
        setUsername('');
      } 
      // Login
      const response = await axios.post('/backend/user/login/', loginData);
      setUsername(loginData.username);
      console.log('Logged in successfully:', response.data);
      navigate('/user')
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid username or password!');
      } else {
        setError('Login failed. Please try again later.');
        console.error('Login failed:', error);
      }
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
          {error && <p style={{ color: 'red' }}>{error}</p>}
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
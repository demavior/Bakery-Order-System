import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
  
  const navigate = useNavigate(); 
  
  const [signupData, setSignupData] = useState({
      username: '',
      password: '',
      first_name: '',
      last_name: '',
      email: ''
  });

  const handleChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify(signupData.username));
    navigate('/user')
  };


  return (
    <div>
      <main>
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                name="username"
                value={signupData.username}
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
                value={signupData.password}
                onChange={handleChange}
                placeholder="Password"
                required
            />
          </div>
          <div>
            <label htmlFor="first_name">First Name:</label>
            <input
                type="text"
                name="first_name"
                value={signupData.first_name}
                onChange={handleChange}
                placeholder="First Name"
                required
            />
            </div>
          <div>
            <label htmlFor="last_name">Last Name:</label>
            <input
                type="text"
                name="last_name"
                value={signupData.last_name}
                onChange={handleChange}
                placeholder="Last Name"
                required
            />
            </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                name="email"
                value={signupData.email}
                onChange={handleChange}
                placeholder="Email"
                required
            />
            </div>
          <button type="submit">Sign Up</button>
        </form>
      </main>
    </div>
  );
}

export default SignUp;
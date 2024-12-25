import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCheckLogin } from '../utils/useCheckLogin';
import axios from 'axios';
axios.defaults.withCredentials = true;

function User() {

  const navigate = useNavigate(); 
  const WelcomeMessage = () => {
    const { user } = useCheckLogin();
    return (
      <h2>
        Welcome, {user}! You can make an order and pick up at the store.
      </h2>
    );
  };

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('/backend/user/logout/');
      console.log('Logged out successfully:', response.data);
    } catch (error) {
      // Handle login error (e.g., display error message)
      console.error('Log out failed:', error.response.data);
    }finally{
      navigate('/signIn')
    }

  };
  return (
    <div>
      {/* Buttons for navigating to different pages */}
      <div>
        <Link to="/user">
          <button className='Navigation'>User</button>
        </Link>
        <Link to="/viewOrders">
          <button className='Navigation'>View Order</button>
        </Link>
        <Link to="/makeOrder">
          <button className='Navigation'>Make Order</button>
        </Link>
        <Link to="/signIn">
          <button className='Navigation' onClick={handleLogout}>Logout</button>
        </Link>
      </div>
      <main>
        <WelcomeMessage />
      </main>
    </div>
  );
};

export default User;

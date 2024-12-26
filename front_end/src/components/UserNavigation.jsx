import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import axios from 'axios';
axios.defaults.withCredentials = true;

const UserNavigation = () => {
  const navigate = useNavigate();
  const { setUsername } = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('/backend/user/logout/');
      setUsername('');
      console.log('Logged out successfully:', response.data);
    } catch (error) {
      console.error('Log out failed:', error.response.data);
    } finally {
      navigate('/signIn');
    }
  };

  return (
    <div>
      <Link to="/user">
        <button className="Navigation">User</button>
      </Link>
      <Link to="/viewOrders">
        <button className="Navigation">View Order</button>
      </Link>
      <Link to="/makeOrder">
        <button className="Navigation">Make Order</button>
      </Link>
      <Link to="/signIn">
        <button className="Navigation" onClick={handleLogout}>
          Logout
        </button>
      </Link>
    </div>
  );
};

export default UserNavigation;
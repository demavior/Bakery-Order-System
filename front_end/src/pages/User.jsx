import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function User() {

  const navigate = useNavigate(); 
  // Gets the user and greets
  const storedUser = localStorage.getItem('user');
  const WelcomeMessage = () => {
    const user = JSON.parse(storedUser);
    return (
      <h2>
        Welcome, {JSON.parse(storedUser)}! You can make an order and pick up at the store.
      </h2>
    );
  };

  const handleLogout = async (e) => {
    e.preventDefault();

    localStorage.setItem('user', "");
    navigate('/signIn')

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

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import '../styles/MakeOrder.css';

function MakeOrder() {
    
  const storedUser = localStorage.getItem('user');
  const user = JSON.parse(storedUser);
  const navigate = useNavigate(); 

  const handleLogout = async (e) => {
    e.preventDefault();

    localStorage.setItem('user', "");
    navigate('/signIn')
  }


  return (
    <div>
      {/* Navigation buttons */}
      <div className="navigation-buttons">
        <Link to="/user">
          <button className='Navigation'>User</button>
        </Link>
        <Link to="/viewOrders">
          <button className='Navigation'>View Order</button>
        </Link>
        <Link to="/makeOrder">
          <button className='Navigation'>Make an Order</button>
        </Link>
        <Link to="/signIn">
          <button className='Navigation' onClick={handleLogout}>Logout</button>
        </Link>
      </div>
      <div className="make-order-container">
        {/* Categories */}
        <div className="categories">
          <h3>Categories</h3>
          <div className="category-list">
          </div>
        </div>
        {/* Items */}
        <div className="items">
          <h3>Items</h3>
          <div className="item-list">

          </div>
        </div>
        {/* Order details */}
        <div className='summary'>
          <h3>Order Summary</h3>
          <table className='order-table'>
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>
          </table>
          <p>Total Price: $</p>
          <button>Confirm Order</button>
        </div>
      </div>
    </div>
  );
}

export default MakeOrder;

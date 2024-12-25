import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom'; 

function ViewOrder() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);

  const navigate = useNavigate(); 
  const storedUser = localStorage.getItem('user');
  const user = JSON.parse(storedUser);

  const handleLogout = async (e) => {
    e.preventDefault();

    localStorage.setItem('user', "");
    navigate('/signIn')
    
  }

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
          <button className='Navigation'>Make an Order</button>
        </Link>
        <Link to="/signIn">
          <button className='Navigation' onClick={handleLogout}>Logout</button>
        </Link>
      </div>
      <h2>My Orders</h2>
      <table className="order-table">
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Total</th>
            <th>Date</th>
            <th>Details</th>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default ViewOrder;

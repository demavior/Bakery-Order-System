import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom'; 
import { useCheckLogin } from '../utils/useCheckLogin';
import axios from 'axios';
axios.defaults.withCredentials = true;

function ViewOrder() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);

  const navigate = useNavigate(); 
  //const { user } = useCheckLogin();
  const user = localStorage.getItem('user');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`/backend/order/getByUser/${user}`);
      const { orders } = response.data;
      setOrders(orders);
      console.log(orders);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  const fetchOrderDetails = async (orderNumber) => {
    try {
      const response = await axios.get(`/backend/order/getByNumber/${orderNumber}`);
      const { details } = response.data;
      setOrderDetails(details);
    } catch (error) {
      console.error('Failed to fetch order details:', error);
    }
  };

  const handleOrderClick = (orderNumber) => {
    setSelectedOrder(orderNumber);
    fetchOrderDetails(orderNumber);
  };

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/backend/user/logout/');
      console.log('Logged out successfully:', response.data);
    } catch (error) {
      // Handle login error (e.g., display error message)
      console.error('Log out failed:', error.response.data);
    }finally{
      localStorage.setItem('user', "");
      navigate('/signIn')
    }
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
        <tbody>
          {orders.map((order) => (
            <React.Fragment key={order.number}>
              <tr>
                <td>{order.number}</td>
                <td>{order.total}</td>
                <td>{order.date}</td>
                <td>
                  <button onClick={() => handleOrderClick(order.number)}>View Details</button>
                </td>
              </tr>
              {selectedOrder === order.number && orderDetails && (
                <tr>
                  <td colSpan="4">
                    <table className="order-details-table">
                      <thead>
                        <tr>
                          <th>Description</th>
                          <th>Quantity</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderDetails.map((detail) => (
                          <tr key={detail.id}>
                            <td>{detail.description}</td>
                            <td>{detail.quantity}</td>
                            <td>{detail.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewOrder;

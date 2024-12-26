import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import '../styles/MakeOrder.css';
axios.defaults.withCredentials = true;

function MakeOrder() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [orderItems, setOrderItems] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);

  const user = localStorage.getItem('user');
  const navigate = useNavigate(); 
  console.log('user: '+user)

  useEffect(() => {
    // Fetch categories from the backend when the component mounts
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/order/getCategories/');
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    // Fetch items based on the selected category when the selected category changes
    const fetchItems = async () => {
      try {
        let url = 'http://localhost:8000/order/getItems/';
        if (selectedCategory) {
          url += selectedCategory;
        }
        const response = await axios.get(url);
        setItems(response.data.items);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    fetchItems();
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleItemClick = (itemId) => {
    console.log(itemId)
    const selectedItem = items.find((item) => item.name === itemId);
    console.log(selectedItem)
    setSelectedItem(selectedItem);
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleAddToOrder = () => {
    // Add the selected item and quantity to the order
    const newItem = {
      name: selectedItem.name,
      quantity: quantity,
      price: selectedItem.price,
      total: quantity * selectedItem.price
    };
    setOrderItems([...orderItems, newItem]);
    setOrderTotal(orderTotal + newItem.total);
    // Reset selected item and quantity for the next selection
    setSelectedItem(null);
    setQuantity(1);
  };

 // Function to handle submitting the order
 const handleSubmitOrder = async () => {
  try {
    // Prepare the order details in the required format
    const orderDetails = orderItems.map(item => ({
      item_name: item.name,
      quantity: item.quantity
    }));
    console.log('Order details:', orderDetails);
    // Make the POST request to save the order
    const response = await axios.post('http://localhost:8000/order/create/', {
      username: user,
      details: orderDetails});
    // Handle the response as needed
    console.log('Order created successfully:', response.data);
    // Show an alert message
    alert('Order confirmed! You can now go to pick it up.');
    // Clear the order summary after submitting
    setOrderItems([]);
    setOrderTotal(0);
    navigate('/viewOrders')
  } catch (error) {
    console.error('Error creating order:', error);
  }

  
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
            {categories.map((category) => (
              <div key={category.name} className="category-tile" onClick={() => handleCategoryClick(category.name)}>
                {category.name}
              </div>
            ))}
          </div>
        </div>
        {/* Items */}
        <div className="items">
          <h3>Items</h3>
          <div className="item-list">
            {items.map((item) => (
              <div key={item.name} className="item-tile" onClick={() => handleItemClick(item.name)}>
                {item.name}
              </div>
            ))}
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
            <tbody>
              {orderItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price}</td>
                  <td>${item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>Total Price: ${orderTotal}</p>
          <button onClick={handleSubmitOrder}>Confirm Order</button>
        </div>
      </div>
      {/* Quantity selection */}
      {selectedItem && (
        <div>
          <p>Unit Price: ${selectedItem.price}</p>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={handleQuantityChange}
          />
          <button onClick={handleAddToOrder}>Add to Order</button>
        </div>
      )}
    </div>
  );
}

export default MakeOrder;

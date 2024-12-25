import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import User from './pages/User';
import MakeOrder from './pages/MakeOrder';
import ViewOrders from './pages/ViewOrders';
import { CSRFTokenProvider } from './utils/CSRFTokenContext';
import { useCheckLogin } from './utils/useCheckLogin';
import './styles/style.css';

function App() {

  const { isLoggedIn, isLoading } = useCheckLogin();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <CSRFTokenProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/home" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/viewOrders" element={<ViewOrders />} />
            <Route path="/makeOrder" element={<MakeOrder />} />
            <Route path="/user" element={isLoggedIn ? <User /> : <Navigate to="/signIn" />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CSRFTokenProvider>
    </div>
  );
}

export default App

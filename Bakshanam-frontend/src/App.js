import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import HeroSection from './component/HeroSection';
import Menu from './component/Menu'; // Updated import for default export
import About from './component/About.js'; // Your About component
import Contactus from './component/Contactus';
// import Login from './component/Login';
// import Register from './component/Register';
import Footer from './component/Footer';
import CartPage from './component/cart';
import Order from './component/order';
import Payment from './component/Payment';
import { CartProvider } from './component/CartContexrprovider';
import Dashboard from './component/Dashboard';
import { FoodProvider } from './Context/Foodcontet';
import Homemakerdashboard from './component/HomemakerDashboard';
import Foodview from './component/Foodview.js'; 
import Homemaker from './component/Homemaker l.js';
import PrivateRoute from './component/PrivateRoute.js'; // Import the PrivateRoute component
import Signup from"../src/component/Signup.js";
import ExploreMenu from '../src/component/ExploreMenu.js';
import Orderdetail from "../src/component/Orderdetail.js";
import UserDetails from '../src/component/Profile.js';
import './App.css';


function App() {
  return (
    <FoodProvider>
      <CartProvider>
        <Router>
          <Home />
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/About" element={<About/>} />
            <Route path="/contactus" element={<Contactus />} />
            {/* <Route path="/login" element={<Login />} /> */}
            {/* <Route path="/register" element={<Register />} /> */}
            <Route path="/Menu" element={<Menu />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/order" element={<Order />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/profile" element={<UserDetails />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/ExploreMenu" element={<ExploreMenu />} />  {/* Main explore menu page */}
      <Route path="/Orderdetail" element={<Orderdetail/>} />  
            {/* Protect homemakerdashboard route with PrivateRoute */}
            <Route
              path="/homemakerdashboard/*"
              element={
                <PrivateRoute>
                  <Homemakerdashboard />
                </PrivateRoute>
              }
            />

            <Route path="/Foodview/:homeMakerId" element={<Foodview />} /> 
            <Route path="/Homemaker" element={<Homemaker />} />
            
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </FoodProvider>
  );
}

export default App;

import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Cart from './pages/Cart/Cart.jsx'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.jsx'
import Footer from './components/Footer/Footer.jsx'
import LoginPopUp from './components/LoginPopUp/LoginPopUp.jsx'
import MyOrders from "./pages/MyOrders/MyOrders";


const App = () => {

  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  return (
    <>
      {showLogin ? <LoginPopUp setShowLogin={setShowLogin} setToken={setToken} /> : null}

      <div className='app'>
        <Navbar setShowLogin={setShowLogin} token={token} setToken={setToken} />


        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/cart" element={<Cart />} />
          <Route path="/order"element={token ? <PlaceOrder /> : <Home />}/>
          <Route path="/myorders" element={token ? <MyOrders /> : <Home />} />


        </Routes>
      </div>

      <Footer />
    </>
  )
}

export default App

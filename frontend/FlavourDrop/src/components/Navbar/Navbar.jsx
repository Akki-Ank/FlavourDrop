import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext.jsx";

const Navbar = ({ setShowLogin, token, setToken }) => {
  const [menu, setMenu] = useState("menu");
  const [showProfile, setShowProfile] = useState(false);

  const { getTotalCartAmount } = useContext(StoreContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setShowProfile(false);
  };

  return (
    <div className="Navbar">
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="Logo" />
      </Link>

      <ul className="Navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("Home")}
          className={menu === "Home" ? "active" : ""}
        >
          Home
        </Link>

        <a
          href="#explore-menu"
          onClick={() => setMenu("Menu")}
          className={menu === "Menu" ? "active" : ""}
        >
          Menu
        </a>

        <a
          href="#app-download"
          onClick={() => setMenu("App-download")}
          className={menu === "App-download" ? "active" : ""}
        >
          App-Download
        </a>

        <a
          href="#footer"
          onClick={() => setMenu("Contact-us")}
          className={menu === "Contact-us" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>

      <div className="Navbar-right">
        <img src={assets.search_icon} alt="search" className="User-Icon" />

        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="basket" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {/* LOGIN / PROFILE */}
        {!token ? (
          <button onClick={() => setShowLogin(true)} className="Sign-in">
            Sign in
          </button>
        ) : (
          <div className="profile-container">
            <div
              className="profile-button"
              onClick={() => setShowProfile(!showProfile)}
            >
              <img
                src={assets.profile_icon}
                alt="profile"
                className="profile-icon"
              />
              <span className="dropdown-arrow">▼</span>
            </div>

            {showProfile && (
              <div className="profile-dropdown">
                <Link to="/myorders" onClick={() => setShowProfile(false)}>
                  My Orders
                </Link>
                <hr />
                <p onClick={logout}>Logout</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

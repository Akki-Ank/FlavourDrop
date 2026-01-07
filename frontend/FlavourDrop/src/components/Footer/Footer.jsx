import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-left">
          <img src={assets.logo} alt="FlavourDrop logo" className="footer-logo" />
          <p className="footer-tag">Fresh flavours delivered to your door</p>

          <div className="footer-social-icons" aria-label="Social links">
            <a href="#" aria-label="Facebook">
              <img src={assets.facebook_icon} alt="Facebook" />
            </a>
            <a href="#" aria-label="Twitter">
              <img src={assets.twitter_icon} alt="Twitter" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <img src={assets.linkedin_icon} alt="LinkedIn" />
            </a>
          </div>
        </div>

        <nav className="footer-center" aria-label="Footer navigation">
          <h3>Company</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Delivery</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </nav>

        <div className="footer-right">
          <h3>Contact</h3>
          <ul>
            <li><a href="tel:+1231124124124">+1 (231) 124-124124</a></li>
            <li><a href="mailto:contact@flavourdrop.com">contact@flavourdrop.com</a></li>
          </ul>
        </div>

      </div>

      <hr />

      <div className="footer-bottom">
        <p>© {year} FlavourDrop. All rights reserved.</p>
        <p className="footer-credit">Made with ❤️</p>
      </div>
    </footer>
  );
};

export default Footer;

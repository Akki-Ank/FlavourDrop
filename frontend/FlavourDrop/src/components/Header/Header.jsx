import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order your favorite food in just one click with Flavour Drop</h2>
        <p>
          Flavour Drop is where rich spices and refined taste come together.
          Every dish is crafted to excite your senses and satisfy your cravings.
          Order once, and let the flavour speak for itself.
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;

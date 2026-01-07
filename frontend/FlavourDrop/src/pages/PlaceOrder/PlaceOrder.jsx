import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import API from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

const PlaceOrder = () => {
  const navigate = useNavigate();

  const {
    cartItems,
    food_list,
    getTotalCartAmount,
    clearCart,
  } = useContext(StoreContext);

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    try {
      // Convert cartItems mapping into an array of detailed item objects
      const itemsArray = Object.keys(cartItems).map((id) => {
        const quantity = cartItems[id];
        const food = food_list.find((f) => f._id === id) || {};
        return {
          _id: id,
          name: food.name || "",
          price: food.price || 0,
          quantity,
          image: food.image || "",
        };
      });

      const orderData = {
        items: itemsArray,
        amount: getTotalCartAmount(),
        address: address,
      };

      const res = await API.post("/api/order/place", orderData);

      if (res.data.success) {
        alert("Order placed successfully!");
        clearCart();
        navigate("/myorders");
      } else {
        alert("Failed to place order");
      }
    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  return (
    <div className="order-page-container">
      <form className="place-order" onSubmit={placeOrder}>
        {/* LEFT SIDE */}
        <div className="place-order-left">
          <p className="title">Delivery Information</p>

          <div className="multi-fields">
            <input
              name="firstName"
              value={address.firstName}
              onChange={onChangeHandler}
              type="text"
              placeholder="First Name"
              required
            />
            <input
              name="lastName"
              value={address.lastName}
              onChange={onChangeHandler}
              type="text"
              placeholder="Last Name"
              required
            />
          </div>

          <input
            name="email"
            value={address.email}
            onChange={onChangeHandler}
            type="email"
            placeholder="Email address"
            required
          />
          <input
            name="street"
            value={address.street}
            onChange={onChangeHandler}
            type="text"
            placeholder="Street"
            required
          />

          <div className="multi-fields">
            <input
              name="city"
              value={address.city}
              onChange={onChangeHandler}
              type="text"
              placeholder="City"
              required
            />
            <input
              name="state"
              value={address.state}
              onChange={onChangeHandler}
              type="text"
              placeholder="State"
              required
            />
          </div>

          <div className="multi-fields">
            <input
              name="zip"
              value={address.zip}
              onChange={onChangeHandler}
              type="text"
              placeholder="Zip Code"
              required
            />
            <input
              name="country"
              value={address.country}
              onChange={onChangeHandler}
              type="text"
              placeholder="Country"
              required
            />
          </div>

          <input
            name="phone"
            value={address.phone}
            onChange={onChangeHandler}
            type="text"
            placeholder="Phone"
            required
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>SubTotal</p>
                <p>₹{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>₹{getTotalCartAmount() === 0 ? 0 : 21}</p>
              </div>
              <div className="cart-total-details">
                <p>Total</p>
                <p>
                  ₹
                  {getTotalCartAmount() === 0
                    ? 0
                    : getTotalCartAmount() + 21}
                </p>
              </div>
            </div>

            <button type="submit">Proceed to Payment</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;

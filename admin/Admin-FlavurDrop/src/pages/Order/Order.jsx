import React, { useEffect, useState } from "react";
import "./Order.css";
import API from "../../utils/api";

const Order = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await API.get("/api/order/list");
    if (res.data.success) {
      setOrders(res.data.data);
    }
  };

  const updateStatus = async (e, orderId) => {
    await API.post("/api/order/status", {
      orderId,
      status: e.target.value
    });
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    
  <div className="order">
    <h2>Orders</h2>

    <div className="order-list">
      {orders.map((order) => (
        <div key={order._id} className="order-item">

          {/* LEFT: Customer & Address */}
          <div className="order-item-left">
            <p className="name">
              {order.address.firstName} {order.address.lastName}
            </p>
            <p className="address">
              {order.address.street}, {order.address.city}
            </p>

            {/* ITEMS */}
            <div className="order-items">
              {order.items.map((item, index) => (
                <p key={index} className="order-item-name">
                  🍴 {item.name} × {item.quantity}
                </p>
              ))}
            </div>
          </div>

          {/* MIDDLE: Amount */}
          <div className="order-item-middle">
            ₹{order.amount}
          </div>

          {/* RIGHT: Status */}
          <div className="order-item-right">
            <select
              value={order.status}
              onChange={(e) => updateStatus(e, order._id)}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>

        </div>
      ))}
    </div>
  </div>
);
}

export default Order;

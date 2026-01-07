import React, { useEffect, useState } from "react";
import API from "../../utils/api";
import "./MyOrders.css";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/api/order/myorders");
      if (res.data.success) {
        setOrders(res.data.data);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to load orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="order-card">
            {/* Order Header */}
            <div className="order-header">
              <div>
                <p className="order-id">Order ID: {order._id}</p>
                <p className="order-date">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
              <span className="order-status">{order.status}</span>
            </div>

            {/* Order Items */}
            <div className="order-items">
              {(() => {
                const itemsToRender = Array.isArray(order.items)
                  ? order.items
                  : Object.keys(order.items || {}).map((id) => {
                      const val = order.items[id];
                      let quantity = 0,
                        price = 0,
                        name = "",
                        image = "";

                      if (typeof val === "number") {
                        quantity = val;
                      } else if (typeof val === "object") {
                        quantity = val.quantity || val.qty || val.count || 0;
                        price = val.price || 0;
                        name = val.name || "";
                        image = val.image || "";
                      }

                      return { _id: id, quantity, price, name, image };
                    });

                return itemsToRender.map((item, idx) => {
                const imageUrl = item.image?.startsWith("http")
                  ? item.image
                  : `http://localhost:4000/uploads/${item.image}`;

                return (
                  <div key={idx} className="order-item">
                    <img
                      src={imageUrl}
                      alt={item.name}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/80";
                      }}
                    />

                    <div>
                      <p className="item-name">{item.name || "-"}</p>
                      <p className="item-qty">Qty: {item.quantity ?? "-"}</p>
                      <p className="item-price">₹{item.price ?? 0}</p>
                    </div>
                  </div>
                );
                });
              })()}
            </div>

            {/* Order Footer */}
            <div className="order-footer">
              <p>
                <b>Total Amount:</b> ₹{
                  order.amount || (
                        Array.isArray(order.items)
                          ? order.items.reduce(
                              (s, it) => s + (Number(it.price) || 0) * (Number(it.quantity) || 0),
                              0
                            )
                          : Object.keys(order.items || {}).reduce((s, id) => {
                              const val = order.items[id];
                              if (typeof val === "number") return s + 0;
                              if (typeof val === "object")
                                return s + (Number(val.price) || 0) * (Number(val.quantity) || 0);
                              return s;
                            }, 0)
                  )
                }
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;

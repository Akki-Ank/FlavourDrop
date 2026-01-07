import orderModel from "../models/OrderModel.js";

// ================= PLACE ORDER =================
const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.userId,          // ✅ from JWT, not from frontend
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();

    res.json({ success: true, message: "Order Placed Successfully" });

  } catch (error) {
    console.log("PLACE ORDER ERROR:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
// ================= USER ORDERS =================
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log("USER ORDERS ERROR:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


// ================= LIST ALL ORDERS (ADMIN) =================
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log("LIST ORDER ERROR:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ================= UPDATE ORDER STATUS (ADMIN) =================
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });

    res.json({ success: true, message: "Status Updated" });

  } catch (error) {
    console.log("UPDATE STATUS ERROR:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export { placeOrder, listOrders, updateStatus , userOrders };

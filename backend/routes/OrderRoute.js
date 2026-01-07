import express from "express";
import { placeOrder,  listOrders,  updateStatus,  userOrders,} from "../controllers/OrderController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const orderRouter = express.Router();

// ================= USER ROUTES =================

// Place order (protected)
orderRouter.post("/place", authMiddleware, placeOrder);

// Get logged-in user's orders (protected)
orderRouter.get("/myorders", authMiddleware, userOrders);

// ================= ADMIN ROUTES =================

// List all orders
orderRouter.get("/list", listOrders);

// Update order status
orderRouter.post("/status", updateStatus);

export default orderRouter;

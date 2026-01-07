import express from "express";
import cors from "cors";
import path from "path";
import orderRouter from "./routes/orderRoute.js";
import userRouter from "./routes/UserRoute.js";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import dotenv from "dotenv";

dotenv.config();

// app config
const app = express();
const port = 4000;

// middleware (MUST BE BEFORE ROUTES)
app.use(express.json());
app.use(cors());

// serve uploaded images
const uploadsPath = path.resolve("uploads");
app.use("/uploads", express.static(uploadsPath));

// db connection
connectDB();

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/api/order", orderRouter);
app.use("/images", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

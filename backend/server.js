import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongoDB.js";
import connectCloudinary from "./config/cloudinary.js";
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";
import orderRouter from "./routes/orderRoute.js";
import cartRouter from "./routes/cartRoute.js";

// Load .env FIRST
dotenv.config();

// Debugging: check if Stripe key is loaded
console.log("Stripe key:", process.env.STRIPE_SECRET_KEY ? "Loaded " : "Not Loaded ");

// Connect to DB + Cloudinary
connectDB();
connectCloudinary();

// App Config
const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cors());

// API Endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use('/api/cart', cartRouter);
app.use("/api/order", orderRouter);

// Root Route
app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => console.log(` Server Started on port: ${port}`));

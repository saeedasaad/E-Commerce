import orderModel from "../models/orderModel.js";
import userModel from "../models/userModels.js";
import Stripe from "stripe";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const currency = "inr";
const deliveryCharge = 10;

// Stripe setup
if (!process.env.STRIPE_SECRET_KEY) {
  console.error("Stripe secret key is missing. Check your .env file.");
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

// placing orders using COD Method
const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    if (!items?.length || !amount || !address) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const userId = req.user.id;

    const newOrder = new orderModel({
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.error("Place order error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// // placing orders using Stripe Method
const placeOrderStripe = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const { origin } = req.headers;
    const userId = req.user.id;

    const newOrder = new orderModel({
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    });
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency,
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency,
        product_data: { name: "Delivery Charges" },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Stripe session error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Verify Stripe 
const verifyStripe = async (req, res) => {
  try {
    const { orderId, success } = req.body;
    if (!orderId) {
      return res.status(400).json({ success: false, message: "Order ID is required" });
    }

    const userId = req.user.id;
    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    if (order.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized for this order" });
    }

    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      return res.json({ success: true, message: "Payment verified and order updated" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      return res.json({ success: false, message: "Payment failed. Order deleted" });
    }
  } catch (error) {
    console.error("Stripe verification error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// All orders data for Admin panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.error("All orders error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// get user card data frontend
const userOrders = async (req, res) => {
  try {
    const userId = req.user.id; 
    console.log("Fetching orders for user:", userId); 

    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.error("User orders error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// update order Status
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.error("Update status error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};


export {
  verifyStripe,
  placeOrder,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
};
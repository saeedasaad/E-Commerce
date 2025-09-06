import userModel from "../models/userModels.js";

// Add products to user cart
const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId, size } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

    userData.cartData = cartData;
    await userData.save();

    return res.status(200).json({
      success: true,
      message: "Added to Cart",
      cart: cartData,
    });
  } catch (error) {
    console.error("Error in addToCart:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update user cart
const updateCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId, size, quantity } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }
    cartData[itemId][size] = quantity;

    userData.cartData = cartData;
    await userData.save();

    return res.status(200).json({
      success: true,
      message: "Cart updated",
      cart: cartData,
    });
  } catch (error) {
    console.error("Error in updateCart:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get user cart
const getUserCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, cart: user.cartData || {} });
  } catch (error) {
    console.error("Get cart error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
import { v2 as cloudinary } from "cloudinary";
import productModel from '../models/productModel.js';

// Add a new product
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestSeller } = req.body;

    const images = [];
    for (const key of ['image1', 'image2', 'image3', 'image4']) {
      const file = req.files?.[key]?.[0];
      if (file) {
        const result = await cloudinary.uploader.upload(file.path, { resource_type: 'image' });
        images.push(result.secure_url);
      }
    }

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestSeller: bestSeller === 'true',
      images,
      date: Date.now()
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.error("Error in addProduct:", error);
    res.status(500).json({ success: false, message: "Server error while adding product" });
  }
};

// List all products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.error("Error in listProducts:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove a product
const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }

    const deletedProduct = await productModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.error("Error in removeProduct:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single product details
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.error("Error in singleProduct:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { listProducts, addProduct, removeProduct, singleProduct };
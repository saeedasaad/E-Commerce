import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const delivery_fee = 10;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);
  }, []);


  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      fetchUserCart();
    } else {
      localStorage.removeItem("token");
      setCartItems({});
    }
  }, [token]);


  useEffect(() => {
    if (token && window.location.pathname === "/login") {
      navigate("/");
    }
  }, [token, navigate]);


  const getProductData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Product fetch error:", error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);


  const fetchUserCart = async () => {
    if (!token) return;
    try {
      const res = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        setCartItems(res.data.cart || {});
      }
    } catch (error) {
      console.error("Fetch cart error:", error.message);
      toast.error(error.response?.data?.message || error.message);
    }
  };


  const addToCart = async (itemId, size) => {
    if (!size) return toast.error("Select product size");

    const updatedCart = { ...cartItems };
    if (!updatedCart[itemId]) updatedCart[itemId] = {};
    updatedCart[itemId][size] = (updatedCart[itemId][size] || 0) + 1;
    setCartItems(updatedCart);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, size },
          { headers: { Authorization: `Bearer ${token}` } }
        );

      } catch (error) {
        console.error("Add to cart error:", error.message);
        toast.error(error.response?.data?.message || error.message);
      }
    }
  };


  const updateQuantity = async (itemId, size, quantity) => {
    const updatedCart = { ...cartItems };
    if (updatedCart[itemId] && updatedCart[itemId][size] !== undefined) {
      updatedCart[itemId][size] = quantity;
    }
    setCartItems(updatedCart);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, size, quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error("Update cart error:", error.message);
        toast.error(error.response?.data?.message || error.message);
      }
    }
  };


  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        totalCount += cartItems[itemId][size];
      }
    }
    return totalCount;
  };


  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const item = products.find((p) => p._id === itemId);
      if (item) {
        for (const size in cartItems[itemId]) {
          totalAmount += item.price * cartItems[itemId][size];
        }
      }
    }
    return totalAmount;
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
    setCartItems,
    fetchUserCart,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export { ShopContext };
export default ShopContextProvider;
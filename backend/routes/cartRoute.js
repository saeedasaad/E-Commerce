import express from 'express';
import { addToCart, updateCart, getUserCart } from '../controllers/cartController.js';
import authUser from '../middleware/auth.js';

const cartRouter = express.Router();

cartRouter.post('/get', authUser, getUserCart);  
cartRouter.post('/add', authUser, (req, res) => {
  console.log("/api/cart/add route hit");
  res.send("OK");
});

cartRouter.post('/update', authUser, updateCart);

export default cartRouter;
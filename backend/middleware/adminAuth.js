import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const isValidUser = (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD);

  if (!isValidUser) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  // Create token payload
  const payload = {
    email,
    role: 'admin', 
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

  return res.json({ success: true, token, message: 'Login successful' });
});

export default router;

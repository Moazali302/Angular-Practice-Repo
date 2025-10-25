const express = require('express');
const router = express.Router();
const {
  signupUser,
  loginUser,
  getProfile,
  updateProfile,
  forgotPassword,
  resetPassword
} = require('../controllers/authControllers');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET_KEY || "your_secret_key";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: "Access denied, token missing!" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token!" });
  }
};

router.post('/signup', signupUser);
router.post('/login', loginUser);

router.get('/profile', verifyToken, getProfile);
router.put('/profile', updateProfile);
router.put('/update', updateProfile);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

module.exports = router;

const express = require('express');
const router = express.Router();
const verifyToken = require('../Middleware/authmiddleware');
const {
  signupUser,
  loginUser,
  getProfile,
  updateProfile,
  forgotPassword,
  resetPassword,
  googleLogin,
  microsoftLogin
} = require('../controllers/authControllers');

// 🔹 Auth routes
router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

// 🔹 Social login routes (frontend use karega ye)
router.post('/google', googleLogin);
router.post('/microsoft', microsoftLogin);

// 🔹 Protected routes
router.get('/profile', verifyToken, getProfile);
router.put('/update', verifyToken, updateProfile);

module.exports = router;

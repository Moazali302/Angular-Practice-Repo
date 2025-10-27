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
} = require('../controllers/authControllers');


router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);


router.get('/profile', verifyToken, getProfile);
router.put('/update', verifyToken, updateProfile); 

module.exports = router;
